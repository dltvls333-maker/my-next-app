import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    // 💡 요청이 들어오는 시점에 클라이언트를 생성하여 환경 변수 누락 방지
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw500('Supabase 환경 변수가 설정되지 않았습니다.');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const formData = await req.formData();
    
    // 폼 데이터 추출
    const category = formData.get('category') as string;
    const user_name = formData.get('user_name') as string;
    const phone_last = formData.get('phone_last') as string || '0000';
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // 프론트에서 보낸 'images[]' 파일 추출
    const files = formData.getAll('images[]') as File[];
    let imageUrl = null;
    
    if (files && files.length > 0 && files[0].size > 0) {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      
      // Supabase Storage 'reviews' 버킷 업로드
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('reviews')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase 업로드 에러:", uploadError);
        throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
      }

      // 공개 URL 가져오기
      const { data: publicUrlData } = supabase.storage
        .from('reviews')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }
    
    // IP 주소 추출
    const forwarded = req.headers.get('x-forwarded-for');
    const ip_address = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
    
    // 비밀번호 암호화
    const password = formData.get('password') as string || 'admin_default_pass';
    const hashedPassword = await bcrypt.hash(password, 10);

    const lastReview = await prisma.review.findFirst({
      where: { ip_address: ip_address },
      orderBy: { created_at: 'desc' },
    });

    if (lastReview) {
      const lastReviewTime = new Date(lastReview.created_at).getTime();
      const nowKst = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })).getTime();
      const timeDiff = (nowKst - lastReviewTime) / 1000;
      
      if (timeDiff < 10) {
        return NextResponse.json(
          { error: '도배 방지를 위해 10초 후에 다시 작성해주세요.' },
          { status: 429 }
        );
      }
    }

    // 필수 필드 검증
    if (!category || !user_name || !title || !content) {
      return NextResponse.json({ error: '필수 데이터가 누락되었습니다.' }, { status: 400 });
    }

    const kstDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

    // Prisma 저장 (Railway DB)
    const newReview = await prisma.review.create({
      data: {
        category,
        user_name,
        phone_last,
        password: hashedPassword,
        title,
        content,
        image_url: imageUrl,
        ip_address,
        created_at: kstDate,
      },
    });

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    console.error("서버 상세 에러:", error);
    return NextResponse.json({ error: 'DB 저장 실패', details: String(error) }, { status: 500 });
  }
}

function throw500(message: string) {
  throw new Error(message);
}