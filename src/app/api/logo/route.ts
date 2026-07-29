import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const logo = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    
    // 데이터가 있으면 반환, 없으면 빈 값을 가진 객체 반환
    return NextResponse.json(logo || { logo_path: '', logo_name: '' });
  } catch (error) {
    // 에러 발생 시에도 빈 JSON을 반환하여 파싱 에러 방지
    return NextResponse.json({ logo_path: '', logo_name: '' });
  }
}