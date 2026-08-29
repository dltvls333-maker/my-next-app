import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // 폼 데이터 추출
    const category = formData.get('category') as string;
    const user_name = formData.get('user_name') as string;
    const phone_last = formData.get('phone_last') as string || '0000';
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    
    // 💡 프론트엔드에서 보낸 'images[]' 파일들 추출
    const files = formData.getAll('images[]') as File[];
    let imageUrl = null;
    
    if (files && files.length > 0 && files[0].size > 0) {
      const file = files[0]; // 첫 번째 이미지 파일을 로컬에 저장
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Railway 서버 로컬 폴더(public/uploads) 경로 설정
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {
        // 폴더가 이미 존재하면 무시
      }

      // 고유 파일명 생성 (공백 제거)
      const uniqueFilename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
      const filePath = path.join(uploadDir, uniqueFilename);
      
      // 파일 쓰기
      await writeFile(filePath, buffer);
      
      // DB에 저장될 웹 접근 경로
      imageUrl = `/uploads/${uniqueFilename}`;
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
        image_url: imageUrl, // 💡 Railway 로컬에 저장된 이미지 경로 저장
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