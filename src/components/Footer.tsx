'use client';

import React, { useState, useEffect } from 'react';

export default function Footer() {
  // DB에서 가져온 로고 정보를 저장할 상태
 const [logo, setLogo] = useState<{ logo_path: string; logo_name: string } | null>(null);
  const [info, setInfo] = useState<CompanyInfo | null>(null);

  // 로고 로드 (기존 코드 유지)
  useEffect(() => {
    fetch('/api/logo')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.logo_path) {
          setLogo(data);
        }
      })
      .catch((err) => console.error("로고 로드 실패:", err));
  }, []);

  // 회사 정보 로드 (추가)
  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.json())
      .then((data) => {
        // DB에서 가져온 데이터가 있는지 확인
        if (data) {
          setInfo(data);
        }
      })
      .catch((err) => console.error("회사 정보 로드 실패:", err));
  }, []);
  return (
    <footer className="w-full bg-[#090a0f] text-[#94a3b8] py-16 md:py-20 border-t border-zinc-900/50 font-sans">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        {/* ─── [BLOCK 01 : 상단 브랜딩 및 고객센터 구역] ─── */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 pb-12 border-b border-zinc-800/40">
          
          {/* 👈 좌측: 로고 (추후 이미지 대응) 및 한 줄 브랜드 슬로건 */}
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center min-h-[32px]">
              
             <a href="/" className="flex items-center">
              <img 
                src={logo?.logo_path || "/images/logo.png"} 
                alt={logo?.logo_name || "로고"} 
                className="h-10 md:h-12 w-auto object-contain"
                style={{ height: '60px', width: 'auto', marginLeft:'-15px', }}
              />
            </a>

            </div>
            <p className="text-[13px] text-zinc-500 font-normal tracking-tight leading-relaxed">
              고객과 통신, 가전을 가장 투명하고 합리적인 혜택으로 이어주는 스마트 비즈니스 파트너십 플랫폼.
            </p>
          </div>

          {/* 👉 우측: 직관적인 대형 고객센터 콜아웃 */}
          <div className="md:text-right space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-md inline-block">
              고객센터 안내
            </span>
            <div className="pt-2">
              <a 
                href="tel:1661-0588" 
                className="text-3xl sm:text-4xl font-black text-white tracking-tight hover:text-blue-500 transition-colors duration-200 block"
              >
                1661-0588
              </a>
              <span className="text-[12px] text-zinc-500 block mt-1 tracking-tight">
                평일 09:00 ~ 18:00 (주말/공휴일 휴무)
              </span>
            </div>
          </div>

        </div>

        {/* ─── [BLOCK 02 : 하단 필수 정보 및 카피라이트 구역] ─── */}
        <div className="pt-12 flex flex-col lg:flex-row lg:justify-between lg:items-stretch gap-8">
          
          {/* 👈 좌측 정보 단 (총 3줄 구조) */}
          <div className="text-[12px] text-zinc-500 font-normal leading-relaxed max-w-4xl space-y-2.5 tracking-tight flex flex-col justify-between">
            {/* 1층: 사업자 기본 정보 */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-zinc-400/80">
              <p>
                <span className="text-zinc-600 font-medium mr-1">상호</span> 
                {info?.company_name || '로딩중...'}
              </p>
              <p>
                <span className="text-zinc-600 font-medium mr-1">대표자</span> 
                {info?.ceo_name || ''}
              </p>
              <p>
                <span className="text-zinc-600 font-medium mr-1">사업자등록번호</span> 
                {info?.business_reg_num || ''}
              </p>
              <p>
                <span className="text-zinc-600 font-medium mr-1">통신판매업신고</span> 
                {info?.mail_order_reg_num || ''}
              </p>
            </div>

            {/* 2층: 주소 */}
            <p className="text-zinc-400/80">
              <span className="text-zinc-600 font-medium mr-1">주소</span> 
              {info?.address || '로딩중...'}
            </p>
                        
            {/* 3층: 하단 고지사항 */}
            <p className="text-[11px] text-zinc-600 leading-relaxed max-w-3xl pt-0.5">
              고지사항: 이음통신은 각 통신사 및 렌탈사의 공식 접수처입니다. 본 사이트에서 가입 시 제공되는 사은품 및 지원금 혜택은 요금제 규칙에 따라 변동될 수 있습니다.
            </p>
          </div>

          {/* 👉 우측 정보 단 (바닥 라인 수평 일치 완료) */}
          <div className="flex flex-col justify-between items-start lg:items-end text-[12px] whitespace-nowrap lg:text-right min-h-full">
            <div className="flex gap-x-4 font-medium text-zinc-400 mb-4 lg:mb-0">
              <a href="/terms" className="hover:text-white transition-colors">이용약관</a>
              <a href="/privacy" className="text-zinc-300 font-semibold hover:text-white transition-colors">개인정보처리방침</a>
            </div>
            <p className="text-zinc-600 tracking-tight lg:pt-1">
              © 2026 EUM TELECOM. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}