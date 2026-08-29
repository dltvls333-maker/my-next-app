import { prisma } from '@/lib/prisma';
import BannerCard from './BannerCard'; 
import { getServerSession } from "next-auth";
import { createEmptyBanner } from '../actions';
import { redirect } from 'next/navigation'
import CompanyInfoManager from './CompanyInfoManager';
import LogoManager from './LogoManager'; 
import ReviewsAdmin from './ReviewsAdmin';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { headers } from 'next/headers'; 
import bcrypt from 'bcrypt'
import LogoutButton from "./LogoutButton"; 
import { authOptions } from "@/lib/auth"; 
import Link from "next/link"; // ★ Link 컴포넌트 추가

export default async function AdminPage() {
const session = (await getServerSession(authOptions as any)) as any;
const userData = session?.user;
  
  async function handleServerSubmit(formData: FormData) {
    'use server'; 
    
    const category = formData.get('category') as string;
    const user_name = formData.get('user_name') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const files = formData.getAll('images[]') as File[];
    
    let imageUrl = null;

    // 💡 Supabase Storage 업로드 로직
    if (files.length > 0 && files[0].size > 0) {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Supabase 클라이언트 동적 생성 (환경 변수 사용)
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const fileName = `admin-${Date.now()}_${file.name.replace(/\s/g, '_')}`;

        // Supabase 'reviews' 버킷에 업로드 (버킷 이름이 다른 경우 수정하세요)
        const { error: uploadError } = await supabase.storage
          .from('reviews')
          .upload(fileName, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (!uploadError) {
          const { data: publicUrlData } = supabase.storage
            .from('reviews')
            .getPublicUrl(fileName);
          
          imageUrl = publicUrlData.publicUrl;
        } else {
          console.error("Supabase 업로드 에러:", uploadError.message);
        }
      }
    }

    const saltRounds = 10;
    const password = 'dldmaxhdtls!'; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const headersList = await headers(); 
    const forwarded = headersList.get('x-forwarded-for');
    const ip_address = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    await prisma.review.create({
      data: {
        category,
        user_name,
        title,
        content,
        image_url: imageUrl, // Supabase 퍼블릭 URL이 저장됩니다
        phone_last: '0000',    
        password: hashedPassword,      
        ip_address: ip_address,  
      }
    });
  }

  const banners = await prisma.banners.findMany({ orderBy: { sort_order: 'asc' } });
  const siteSettings = await prisma.site_settings.findUnique({ where: { id: 1 } });
  const info = await prisma.companyinfo.findUnique({ where: { id: 1 } });

  return (
    <main className="max-w-[1240px] mx-auto p-4 md:p-8">
      <div className="py-10">
        
      {/* 상단 헤더 섹션 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">관리자 대시보드</h1>
          <p className="text-slate-500 mt-1">최고관리자님, 오늘도 환영합니다.</p>
        </div>
        
        {/* ★ 문의 카테고리 링크 버튼 및 로그아웃 버튼 영역 */}
        <div className="flex items-center gap-3">
          <Link 
            href="/admin/inquiries" 
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-5 py-2.5 rounded-xl font-bold transition"
          >
            📋 문의 관리
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* 관리자 프로필 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-3 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-lg shadow-indigo-200">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold">
              {userData?.name?.charAt(0) || "A"}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{userData?.name}</h2>
              <p className="text-indigo-100 opacity-90">{userData?.email}</p>
            </div>
            <div className="ml-auto flex gap-4">
              <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wider text-indigo-200 font-semibold">권한</p>
                <p className="text-xl font-bold">{userData?.role}</p>
              </div>
              <div className="text-center px-6 py-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <p className="text-xs uppercase tracking-wider text-indigo-200 font-semibold">레벨</p>
                <p className="text-xl font-bold">{userData?.level} 단계</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        {/* 로고 관리 섹션 */}
        <div className="flex justify-between items-center mb-12 pb-8 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">로고 관리</h2>
            <p className="text-slate-500 text-sm">사이트 상단 로고를 변경합니다.</p>
          </div>
          <LogoManager initialLogo={siteSettings?.logo_path || '/logo.png'} />
        </div>
        
        {/* 헤더 섹션 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-bold text-slate-900">메인 슬라이드 관리</h1>
            <p className="text-slate-500 text-sm">홈페이지 상단 슬라이더를 관리합니다.</p>
          </div>
          <form action={createEmptyBanner}>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition">
              + 배너 등록하기
            </button>
          </form>
        </div>

        {/* 배너 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))}
        </div>
        <div className="flex justify-between items-center mb-12 pb-8 border-b border-slate-100"></div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">회사 정보관리</h1>
            <p className="text-slate-500 text-sm">회사정보를 관리합니다.</p>
          </div>
        <CompanyInfoManager initialInfo={info} />

        <div className="flex justify-between items-center mb-12 pb-8 border-b border-slate-100"></div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">후기 작성</h1>
            <p className="text-slate-500 text-sm">후기를 작성합니다.</p>
          </div>
        <ReviewsAdmin onSubmit={handleServerSubmit} />
      </div>
    </main>
  );
}