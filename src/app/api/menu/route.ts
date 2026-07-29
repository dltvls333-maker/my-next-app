import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Prisma 클라이언트 경로

export async function GET() {
  try {
    const menus = await prisma.menu_items.findMany({
      orderBy: { display_order: 'asc' } // 순서대로 정렬
    });
    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json({ error: "데이터를 불러올 수 없습니다." }, { status: 500 });
  }
}