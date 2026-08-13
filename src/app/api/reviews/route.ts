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
    
    // 프론트에서 보낸 Supabase 이미지 URL들 수신 (JSON 문자열 파싱)
    const imageUrlsJson = formData.get('image_urls') as string;
    let imageUrl = null;
    
    if (imageUrlsJson) {
      try {
        const imageUrls = JSON.parse(imageUrlsJson);
        imageUrl = imageUrls.length > 0 ? imageUrls[0] : null; // 첫 번째 이미지 URL 저장
      } catch (e) {
        imageUrl = null;
      }
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
      // DB에 저장된 시간과 현재 시간을 둘 다 한국 시간(KST) 기준으로 정확히 밀리초 변환
      const lastReviewTime = new Date(lastReview.created_at).getTime();
      
      // 현재 KST 시간 구하기
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

    // 한국 시간(KST) 기준 Date 객체 생성
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
        image_url: imageUrl, // Supabase 이미지 URL 저장
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