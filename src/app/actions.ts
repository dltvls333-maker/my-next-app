'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

// 로고 수정 함수
export async function updateLogo(formData: FormData) {
  const file = formData.get('image') as File | null;
  
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // 로고는 항상 logo.png로 저장
    const fileName = `logo.png`;
    const filePath = path.join(process.cwd(), 'public/images', fileName);
    
    await fs.writeFile(filePath, buffer);
    
    // DB 업데이트
    await prisma.site_settings.update({
      where: { id: 1 },
      data: { logo_path: `/images/${fileName}` }
    });
  }
  revalidatePath('/admin');
}
// app/actions.ts에 추가
export async function createEmptyBanner() {
  await prisma.banners.create({
    data: {
      title: "",
      subtitle: "",
      image_url: "/images/placeholder.png",
      sort_order: 99,
      is_active: true
    },
  });
  revalidatePath('/admin');
}
// 1. 배너 삭제 함수
export async function deleteBanner(id: number) {
  await prisma.banners.delete({
    where: { id: id },
  });
  revalidatePath('/admin');
}

// 2. 배너 수정 및 파일 업로드 함수
export async function updateBannerWithFile(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const file = formData.get('image') as File | null;

  let imageUrl = formData.get('current_image') as string;

  // 파일이 선택되었을 때만 처리
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // public/images 폴더에 저장 (파일 이름은 예시로 id를 사용)
    const fileName = `${id}.png`;
    const filePath = path.join(process.cwd(), 'public/images', fileName);
    
    await fs.writeFile(filePath, buffer);
    imageUrl = `/images/${fileName}`; // DB에 저장될 경로
  }

  await prisma.banners.update({
    where: { id },
    data: { 
      title: title, 
      image_url: imageUrl 
    }
  });

  revalidatePath('/admin');
}

// 3. 회사 정보 수정 함수 (필요 시 유지)
export async function updateCompanyInfo(formData: FormData) {
  await prisma.companyinfo.update({
    where: { id: 1 },
    data: {
      company_name: formData.get('company_name') as string,
      ceo_name: formData.get('ceo_name') as string,
      business_reg_num: formData.get('business_reg_num') as string,
      mail_order_reg_num: formData.get('mail_order_reg_num') as string,
      address: formData.get('address') as string,
    }
  });
  revalidatePath('/admin');
}