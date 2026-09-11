import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma'; // 본인 프로젝트의 prisma 설정 경로

// GET: 목록 가져오기 (노출 순서 오름차순 정렬)
export async function GET() {
  try {
    // const list = await prisma.appliance.findMany({
    //   orderBy: { orderNum: 'asc' },
    // });
    // return NextResponse.json({ success: true, data: list });

    return NextResponse.json({ success: true, data: [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: '목록 조회 실패' }, { status: 500 });
  }
}

// POST: 신규 가전제품 등록
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, badge, src, orderNum } = body;

    // const newItem = await prisma.appliance.create({
    //   data: {
    //     title,
    //     badge,
    //     src,
    //     orderNum: Number(orderNum) || 0,
    //   },
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: '등록 실패' }, { status: 500 });
  }
}