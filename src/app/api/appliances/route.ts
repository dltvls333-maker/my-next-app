import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: 가전제품 목록 조회 API
export async function GET() {
  try {
    const appliances = await prisma.appliance.findMany({
      orderBy: { orderNum: 'asc' },
    });
    return NextResponse.json({ success: true, data: appliances });
  } catch (error) {
    return NextResponse.json({ success: false, error: '데이터를 불러오지 못했습니다.' }, { status: 500 });
  }
}