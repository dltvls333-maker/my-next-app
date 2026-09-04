import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    const reviewId = Number(id);

    // 💡 프론트엔드에서 FormData로 전송했으므로 req.json() 대신 req.formData()를 사용해야 합니다.
    const formData = await req.formData();
    const category = formData.get('category') as string;
    const user_name = formData.get('user_name') as string;
    const phone_last = formData.get('phone_last') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const imageFiles = formData.getAll('images[]') as File[];

    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: '게시글 없음' }, { status: 404 });
    }

    let imageUrls: string[] = [];

    // 새 이미지가 첨부된 경우 서버에 파일 저장 처리
    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }

      for (const file of imageFiles) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '_')}`;
        const filepath = path.join(uploadDir, filename);

        await writeFile(filepath, buffer);
        imageUrls.push(`/uploads/${filename}`);
      }
    }

    const updateData: any = {
      category,
      user_name,
      phone_last,
      title,
      content,
    };

    // 새 이미지가 업로드된 경우에만 이미지 경로 업데이트
    if (imageUrls.length > 0) {
      updateData.image_url = imageUrls.join(',');
    }

    const updated = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("PUT 에러:", error);

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
    const session = (await getServerSession(authOptions as any)) as any;

    if (!session || session.user?.level !== 9) {
      return NextResponse.json(
        { error: "권한이 없습니다." },
        { status: 403 }
      );
    }

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