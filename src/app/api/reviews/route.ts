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

    // 파일 처리 (서버 디스크 저장 대신 Base64로 변환하여 DB에 저장)
    const files = formData.getAll('images[]') as File[];
    let imageUrl = null;

    if (files.length > 0 && files[0].size > 0) {
      const file = files[0];
      const buffer = Buffer.from(await file.arrayBuffer());
      // 이미지를 Base64 데이터 URL 형식으로 변환 (예: data:image/jpeg;base64,...)
      const base64Data = buffer.toString('base64');
      imageUrl = `data:${file.type};base64,${base64Data}`;
    }

    // Prisma 저장
    const newReview = await prisma.review.create({
      data: {
        category,
        user_name,
        phone_last,
        password: hashedPassword,
        title,
        content,
        image_url: imageUrl, // Base64 문자열이 DB에 저장됨
        ip_address,
      },
    });

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    console.error("서버 상세 에러:", error);
    return NextResponse.json({ error: 'DB 저장 실패', details: String(error) }, { status: 500 });
  }
}