import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const data = await req.json();
  const updated = await prisma.companyinfo.update({
    where: { id: 1 },
    data: data,
  });
  return NextResponse.json(updated);
}