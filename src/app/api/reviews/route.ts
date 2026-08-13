import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // 폼 데이터 추출
    const category = formData.get('category') as string;
    const user_name = formData.get('user_name') as string;
    const phone_last = formData.get('phone_last') as string || '0000';
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // 💡 클라이언트에서 Supabase 업로드 후 보낸 이미지 URL 배열 추출
    const imageUrlsJson = formData.get('image_urls') as string;
    let imageUrl = null;
    
    if (imageUrlsJson) {
      const imageUrls = JSON.parse(imageUrlsJson);
      // 만약 여러 장 중 첫 번째만 저장하거나 배열 통째로 저장하는 방식에 맞게 처리
      // 단일 컬럼(image_url)이라면 첫 번째 이미지를 넣거나 JSON으로 저장합니다.
      imageUrl = imageUrls.length > 0 ? imageUrls[0] : null; 
      // 만약 DB 컬럼이 여러 이미지 URL을 담는 구조라면 imageUrls 자체를 넣으셔도 됩니다.
    }
    
    // IP 주소 추출
    const forwarded = req.headers.get('x-forwarded-for');
    const ip_address = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
    
    // 비밀번호 암호화
    const password = formData.get('password') as string || 'admin_default_pass';
    const hashedPassword = await bcrypt.hash(password, 10);

    // 도배 방지 (10초)
    const lastReview = await prisma.review.findFirst({
      where: { ip_address: ip_address },
      orderBy: { created_at: 'desc' },
    });

    if (lastReview) {
      const timeDiff = (new Date().getTime() - new Date(lastReview.created_at).getTime()) / 1000;
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

    // 💡 한국 시간(KST) 기준 Date 객체 생성
    const kstDate = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));

    // Prisma 저장 (파일을 서버에서 직접 안 다루고 Supabase 주소만 가볍게 저장)
    const newReview = await prisma.review.create({
      data: {
        category,
        user_name,
        phone_last,
        password: hashedPassword,
        title,
        content,
        image_url: imageUrl, // Supabase 공인 URL 문자열이 DB에 저장됨
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