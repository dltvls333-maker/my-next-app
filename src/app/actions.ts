'use server'

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase'; // 위에서 만든 파일 경로
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


export async function updateBannerWithFile(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const pcFile = formData.get('image') as File | null;
  const mobileFile = formData.get('link_url') as File | null;

  let imageUrl = formData.get('current_image') as string;
  let linkUrl = formData.get('current_link_url') as string;

  // 1. PC 이미지 처리 (파일명 고정: pc_[배너ID].png -> 수정 시 덮어쓰기 됨)
  if (pcFile && pcFile instanceof File && pcFile.size > 0) {
    const fileName = `pc_${id}.png`; // 👈 Date.now() 제거
    
    const { error } = await supabase.storage
      .from('banners')
      .upload(fileName, pcFile, { upsert: true }); // 👈 upsert: true로 덮어쓰기 활성화
      
    if (error) {
      throw new Error("PC 이미지 업로드 실패: " + error.message);
    }
    
    // 💡 캐시 문제(브라우저가 이전 이미지를 기억하는 현상)를 방지하기 위해 뒤에 타임스탬프를 살짝 붙여줍니다.
    const { data: urlData } = supabase.storage.from('banners').getPublicUrl(fileName);
    imageUrl = `${urlData.publicUrl}?t=${Date.now()}`;
  }

  // 2. 모바일 이미지 처리 (파일명 고정: mobile_[배너ID].png -> 수정 시 덮어쓰기 됨)
  if (mobileFile && mobileFile instanceof File && mobileFile.size > 0) {
    const fileName = `mobile_${id}.png`; // 👈 Date.now() 제거
    
    const { error } = await supabase.storage
      .from('banners')
      .upload(fileName, mobileFile, { upsert: true }); // 👈 upsert: true로 덮어쓰기 활성화
      
    if (error) {
      throw new Error("모바일 이미지 업로드 실패: " + error.message);
    }
    
    const { data: urlData } = supabase.storage.from('banners').getPublicUrl(fileName);
    linkUrl = `${urlData.publicUrl}?t=${Date.now()}`;
  }

  // 3. DB 업데이트
  await prisma.banners.update({
    where: { id },
    data: { 
      title: title, 
      image_url: imageUrl, 
      link_url: linkUrl 
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