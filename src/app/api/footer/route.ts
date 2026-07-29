import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const info = await prisma.companyinfo.findUnique({ where: { id: 1 } });
    
    // 데이터가 없어도 빈 값을 가진 객체를 반환하여 프론트에서 에러 방지
    return NextResponse.json(info || { 
      company_name: '', 
      ceo_name: '', 
      business_reg_num: '', 
      mail_order_reg_num: '', 
      address: '' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'DB 조회 실패' }, { status: 500 });
  }
}