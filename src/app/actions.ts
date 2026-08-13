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
import fs from 'fs/promises';
import path from 'path';

// 2. 배너 수정 및 파일 업로드 함수 (PC, 모바일 모두 반영)
export async function updateBannerWithFile(id: number, formData: FormData) {
  const title = formData.get('title') as string;
  const pcFile = formData.get('image') as File | null;
  const mobileFile = formData.get('link_url') as File | null; // 👈 모바일 파일명(link_url) 추가 캐치

  let imageUrl = formData.get('current_image') as string;
  let linkUrl = formData.get('current_link_url') as string;

  // 1. PC 이미지 처리 (만약 로컬 파일 시스템 대신 깃허브 푸시 방식을 쓰신다면 이 부분도 파일 저장이 아닌 텍스트/경로 방식으로 맞춰야 합니다)
  if (pcFile && pcFile.size > 0) {
    const bytes = await pcFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // 주의: 클라우드 환경에서 fs.writeFile은 에러를 유발할 수 있으니 환경에 맞춰 확인하세요!
    const fileName = `banner_${id}_pc.png`;
    const filePath = path.join(process.cwd(), 'public/images', fileName);
    
    await fs.writeFile(filePath, buffer);
    imageUrl = `/images/${fileName}`;
  }

  // 2. 모바일 이미지 처리 (link_url 필드로 들어온 파일 처리)
  if (mobileFile && mobileFile.size > 0) {
    const bytes = await mobileFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const fileName = `banner_${id}_mobile.png`;
    const filePath = path.join(process.cwd(), 'public/images', fileName);
    
    await fs.writeFile(filePath, buffer);
    linkUrl = `/images/${fileName}`; // DB의 link_url 컬럼에 저장될 경로
  }

  // 데이터베이스 업데이트 (title, image_url, link_url 모두 반영)
  await prisma.banners.update({
    where: { id },
    data: { 
      title: title, 
      image_url: imageUrl,
      link_url: linkUrl // 👈 모바일 이미지 경로 데이터베이스에 반영
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