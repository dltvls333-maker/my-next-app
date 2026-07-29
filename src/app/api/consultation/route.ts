import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone } = body;

    if (!name || !phone) {
      return NextResponse.json({ message: '이름과 연락처를 모두 입력해주세요.' }, { status: 400 });
    }

    // 클라이언트 IP 추출
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1';

    // 동일 IP로 10초 이내 등록된 내역이 있는지 확인 (도배 방지)
    const tenSecondsAgo = new Date(Date.now() - 10 * 1000);
    const recentRequest = await prisma.consultationRequest.findFirst({
      where: {
        ip: ip,
        createdAt: {
          gte: tenSecondsAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (recentRequest) {
      return NextResponse.json(
        { message: '잠시 후(10초 뒤)에 다시 시도해주세요.' },
        { status: 429 } // Too Many Requests
      );
    }

    // Prisma를 통한 데이터 저장 (id 자동증가, ip, 이름, 연락처, 시간 자동입력)
    await prisma.consultationRequest.create({
      data: {
        name,
        phone,
        ip,
      },
    });

    return NextResponse.json({ message: '성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('DB 저장 오류:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}