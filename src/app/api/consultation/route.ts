import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import iconv from 'iconv-lite';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawName = body.name || '';
    const rawPhone = body.phone || '';

    // 앞뒤 공백 제거
    const name = rawName.trim();
    const phone = rawPhone.trim();

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
        { status: 429 }
      );
    }

    // 1. Prisma를 통한 내 데이터베이스 저장
    await prisma.consultationRequest.create({
      data: {
        name,
        phone,
        ip,
      },
    });

    // 2. 외부 Cafe24 서버로 데이터 전송 (EUC-KR 퍼센트 인코딩 직접 적용)
    try {
      // 한글 및 전체 데이터를 EUC-KR 바이너리로 변환 후 %XX 형식의 퍼센트 인코딩으로 수동 직렬화
      const eucKrName = iconv.encode(name, 'euc-kr');
      const eucKrPhone = iconv.encode(phone, 'euc-kr');

      const encodedName = Array.from(eucKrName)
        .map((b) => `%${b.toString(16).padStart(2, '0').toUpperCase()}`)
        .join('');

      const encodedPhone = Array.from(eucKrPhone)
        .map((b) => `%${b.toString(16).padStart(2, '0').toUpperCase()}`)
        .join('');

      const rawBody = `c_code_dbgroup=52&c_name=${encodedName}&c_tel2=${encodedPhone}`;

      const cafeResponse = await fetch('http://tstory12.cafe24.com/gaip/gaip_a_ok.asp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: rawBody,
      });

      // 응답 결과 확인
      const buffer = await cafeResponse.arrayBuffer();
      const responseText = iconv.decode(Buffer.from(buffer), 'euc-kr');

      console.log('===== [Cafe24 응답 결과 (EUC-KR 수동 인코딩)] =====');
      console.log('- Status:', cafeResponse.status);
      console.log('- Response Text:', responseText);
      console.log('==================================================');
    } catch (extError) {
      console.error('외부 Cafe24 데이터 전송 네트워크 오류:', extError);
    }

    return NextResponse.json({ message: '성공적으로 저장되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('DB 저장 오류:', error);
    return NextResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}