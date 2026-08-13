'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { supabase } from '@/lib/supabase';

// 로고 수정 함수 (로컬 파일 시스템 대신 필요에 따라 Supabase나 공용 스토리지 처리 권장)
export async function updateLogo(formData: FormData) {
  const file = formData.get('image') as File | null;
  
  if (file && file.size > 0) {
    const fileName = `logo.png`;
    
    const { error } = await supabase.storage
      .from('banners')
      .upload(fileName, file, { upsert: true });

    if (error) {
      throw new Error("로고 업로드 실패: " + error.message);
    }

    const { data: urlData } = supabase.storage.from('banners').getPublicUrl(fileName);

    // DB 업데이트
    await prisma.site_settings.update({
      where: { id: 1 },
      data: { logo_path: `${urlData.publicUrl}?t=${Date.now()}` }
    });
  }
  revalidatePath('/admin');
}

// 빈 배너 생성 함수
export async function createEmptyBanner() {
  await prisma.banners.create({
    data: {
      title: "",
      subtitle: "",
      image_url: "/images/placeholder.png",
      link_url: "",
      sort_order: 99,
      is_active: true
    },
  });
  revalidatePath('/admin');
}

// 배너 삭제 함수
export async function deleteBanner(id: number) {
  await prisma.banners.delete({
    where: { id: Number(id) },
  });
  revalidatePath('/admin');
  revalidatePath('/');
}

// 배너 파일(PC/모바일) 업로드 및 수정 함수 (요청하신 함수명 그대로 유지)
export async function updateBannerWithFile(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const pcFile = formData.get('image') as File | null;
  const mobileFile = formData.get('link_url') as File | null;

  let imageUrl = formData.get('current_image') as string;
  let linkUrl = formData.get('current_link_url') as string;

  // id 값이 숫자로 잘 들어오는지 확실하게 변환
  const bannerId = Number(id);
  if (!bannerId) {
    throw new Error("유효하지 않은 배너 ID입니다: " + id);
  }

  // 1. PC 이미지 처리
  if (pcFile && pcFile instanceof File && pcFile.size > 0) {
    const fileName = `pc_${bannerId}.png`;
    
    const { error } = await supabase.storage
      .from('banners')
      .upload(fileName, pcFile, { upsert: true });
      
    if (error) {
      console.error("PC 업로드 상세 에러:", error);
      throw new Error("PC 이미지 업로드 실패: " + error.message);
    }
    
    const { data: urlData } = supabase.storage.from('banners').getPublicUrl(fileName);
    imageUrl = `${urlData.publicUrl}?t=${Date.now()}`;
  }

  // 2. 모바일 이미지 처리
  if (mobileFile && mobileFile instanceof File && mobileFile.size > 0) {
    const fileName = `mobile_${bannerId}.png`;
    
    const { error } = await supabase.storage
      .from('banners')
      .upload(fileName, mobileFile, { upsert: true });
      
    if (error) {
      console.error("모바일 업로드 상세 에러:", error);
      throw new Error("모바일 이미지 업로드 실패: " + error.message);
    }
    
    const { data: urlData } = supabase.storage.from('banners').getPublicUrl(fileName);
    linkUrl = `${urlData.publicUrl}?t=${Date.now()}`;
  }

  // 3. DB 업데이트
  await prisma.banners.update({
    where: { id: bannerId },
    data: { 
      title: title, 
      image_url: imageUrl, 
      link_url: linkUrl 
    }
  });

  revalidatePath('/admin');
  revalidatePath('/');
}

// 회사 정보 수정 함수
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