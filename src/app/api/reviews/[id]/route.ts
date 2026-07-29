import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { getServerSession } from "next-auth"; // 상단 import에 추가
import { authOptions } from "@/lib/auth";     // 경로에 맞게 수정
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const reviewId = Number(id);

    if (isNaN(reviewId)) {
      return NextResponse.json(
        { error: "유효하지 않은 ID" },
        { status: 400 }
      );
    }

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return NextResponse.json(
        { error: "게시글 없음" },
        { status: 404 }
      );
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error("GET 에러:", error);

    return NextResponse.json(
      { error: "조회 실패" },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;  

    const body = await req.json();

    console.log("id =", id);
    console.log("body =", body);

    const updated = await prisma.review.update({
      where: {
        id: Number(id),
      },
      data: {
        category: body.category,
        user_name: body.user_name,
        phone_last: body.phone_last,
        title: body.title,
        content: body.content,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "수정 실패" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. 관리자 권한 확인 (세션 체크)
    const session = await getServerSession(authOptions);

    if (!session || session.user?.level !== 9) {
      return NextResponse.json(
        { error: "권한이 없습니다." },
        { status: 403 }
      );
    }

    // 2. ID 추출 및 삭제 로직
    const { id } = await params;
    const reviewId = Number(id);

    await prisma.review.delete({
      where: {
        id: reviewId,
      },
    });

    return NextResponse.json({ success: true, message: "삭제되었습니다." });
  } catch (error) {
    console.error("DELETE 에러:", error);
    return NextResponse.json(
      { error: "삭제 실패" },
      { status: 500 }
    );
  }
}