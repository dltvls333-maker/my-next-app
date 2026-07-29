import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // 폼 데이터 추출 시 데이터 확인을 위한 로그
    const dataObj = Object.fromEntries(formData.entries());
    console.log("서버가 받은 데이터:", dataObj);
    const category = formData.get('category') as string;
    const user_name = formData.get('user_name') as string;
    const phone_last = formData.get('phone_last') as string  || '0000';
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const forwarded = req.headers.get('x-forwarded-for');
    // 콤마로 나열된 경우 첫 번째 IP가 사용자의 진짜 IP입니다.
    const ip_address = forwarded ? forwarded.split(',')[0] : '127.0.0.1';
    const saltRounds = 10;
    const password = formData.get('password') as string || 'admin_default_pass';
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const isAdmin = user_name === '관리자';
    const lastReview = await prisma.review.findFirst({
      where: { ip_address: ip_address },
      orderBy: { created_at: 'desc' }, // 작성일 기준 내림차순
    });

    // 2. 최근 리뷰가 존재하고, 현재 시간과 비교하여 10초가 지나지 않았다면 차단
    if (lastReview) {
      const timeDiff = (new Date().getTime() - new Date(lastReview.created_at).getTime()) / 1000;
      if (timeDiff < 10) {
        return NextResponse.json(
          { error: '도배 방지를 위해 10초 후에 다시 작성해주세요.' },
          { status: 429 } // 429 Too Many Requests
        );
      }
    }
    // 필수 필드 검증 (하나라도 없으면 실패)
    if (!category || !user_name || !title || !content) {
      return NextResponse.json({ error: '필수 데이터가 누락되었습니다.' }, { status: 400 });
    }

    // 파일 처리
    const files = formData.getAll('images[]') as File[];
    let imageUrl = null;

    if (files.length > 0 && files[0].size > 0) {
      const file = files[0];
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
      
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      await writeFile(path.join(uploadDir, fileName), buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    // Prisma 저장
    const newReview = await prisma.review.create({
      data: {
        category,
        user_name,
        phone_last,
        password :hashedPassword,
        title,
        content,
        image_url: imageUrl,
        ip_address,
      },
    });

    return NextResponse.json({ success: true, data: newReview });
  } catch (error) {
    console.error("서버 상세 에러:", error);
    return NextResponse.json({ error: 'DB 저장 실패', details: String(error) }, { status: 500 });
  }
}