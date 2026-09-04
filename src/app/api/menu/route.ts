import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Prisma 클라이언트 경로

export async function GET() {
  try {
    const menus = await prisma.menu_items.findMany({
      where: {
        // is_external이 1이 아닌 항목만 조회 (외부 링크 제외)
        is_external: {
          not: 1,
        },
      },
      orderBy: { display_order: 'asc' }, // 순서대로 정렬
    });
    return NextResponse.json(menus);
  } catch (error) {
    console.error('메뉴 조회 오류:', error);
    return NextResponse.json({ error: "데이터를 불러올 수 없습니다." }, { status: 500 });
  }
}