import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const data = await prisma.footer_text.findFirst();
    return NextResponse.json(data);
  } catch (error) {
    console.error('푸터 텍스트 조회 실패:', error);
    return NextResponse.json(null, { status: 500 });
  }
}