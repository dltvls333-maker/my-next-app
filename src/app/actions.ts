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
      link_url: "", // 모바일 이미지 경로용 필드 추가
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

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// 2. 배너 수정 함수 (파일 시스템에 저장하지 않고 경로/텍스트만 업데이트)
export async function updateBannerWithFile(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  
  // 만약 폼에서 파일이 아니라 이미지 경로 문자열이나 파일명을 직접 받도록 바꾼다면:
  // (예: <input name="image_url" /> 형태로 input을 바꿨을 때)
  const imageUrl = formData.get('image_url') as string; 

  await prisma.banners.update({
    where: { id },
    data: { 
      title: title, 
      // 기존 이미지 유지 혹은 새로 입력받은 경로로 업데이트
      image_url: imageUrl || formData.get('current_image') as string, 
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