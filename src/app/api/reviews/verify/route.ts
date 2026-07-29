import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt'; // bcrypt import 필수!

export async function POST(req: Request) {
  try {
    const { id, password } = await req.json();
    
    // 1. DB에서 해당 글 조회
    const review = await prisma.review.findUnique({ where: { id } });
    
    if (!review) {
      return NextResponse.json({ error: '게시글 없음' }, { status: 404 });
    }

    // 2. 암호화된 비밀번호와 입력받은 비밀번호 비교
    const isMatch = await bcrypt.compare(password, review.password);
    
    if (isMatch) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: '검증 실패' }, { status: 500 });
  }
}