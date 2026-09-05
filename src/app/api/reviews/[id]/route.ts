import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
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

    const session = (await getServerSession(authOptions as any)) as any;
    const isAdmin = session?.user?.level === 9;

    const formData = await req.formData();
    const category = formData.get('category') as string;
    const user_name = formData.get('user_name') as string;
    const phone_last = formData.get('phone_last') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const passwordInput = formData.get('password') as string;
    const imageFiles = formData.getAll('images[]') as File[];

    const existingReview = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!existingReview) {
      return NextResponse.json({ error: '게시글 없음' }, { status: 404 });
    }

    if (!isAdmin) {
      if (!passwordInput) {
        return NextResponse.json({ error: '비밀번호를 입력해주세요.' }, { status: 400 });
      }
      const isMatch = await bcrypt.compare(passwordInput, existingReview.password);
      if (!isMatch) {
        return NextResponse.json({ error: '비밀번호가 틀렸습니다.' }, { status: 401 });
      }
    }

    let imageUrl = existingReview.image_url;

    // 💡 Supabase Storage를 통한 이미지 업로드 처리
    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        return NextResponse.json({ error: 'Supabase 환경 변수가 설정되지 않았습니다.' }, { status: 500 });
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      const file = imageFiles[0];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
// 한글 및 공백으로 인한 Invalid key 에러를 막기 위해 영문/숫자 무작위 이름으로 변환
      const fileExt = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('reviews')
        .upload(fileName, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase 업로드 에러:", uploadError);
        return NextResponse.json({ error: `이미지 업로드 실패: ${uploadError.message}` }, { status: 500 });
      }

      const { data: publicUrlData } = supabase.storage
        .from('reviews')
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    const updated = await prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        category,
        user_name,
        phone_last,
        title,
        content,
        image_url: imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error("PUT 에러:", error);
    return NextResponse.json(
      { error: "수정 실패", details: String(error) },
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