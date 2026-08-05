'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerSliderWithForm({ banners }: { banners: any[] }) {
  // 폼 입력 상태 관리
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('성함을 입력해주세요.');
      return;
    }
    if (!phone.trim()) {
      alert('연락처를 입력해주세요.');
      return;
    }
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    alert('비밀지원금 신청이 정상적으로 접수되었습니다.');
    // TODO: 서버 전송 로직 구현
  };

  return (
    <div className="w-full bg-slate-50 py-6 md:py-10">
      {/* 전체 최대 폭 지정 (필요에 따라 max-w-[1240px] 등 조절) */}
      <div className="max-w-[1240px] mx-auto px-4">
        
        {/* 컨테이너: 데스크톱에서는 Flex로 좌측(폼) / 우측(슬라이드) 배치, 모바일은 세로 배치 */}
        <div className="relative flex flex-col lg:flex-row items-stretch gap-6">
          
          {/* ========================================================= */}
          {/* 1. 비밀지원금 신청 폼 (데스크톱: 좌측 오버레이/사이드 배치, 모바일: 위/아래) */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[380px] bg-white rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 p-6 flex flex-col justify-between z-20 shrink-0">
            <div>
              {/* 타이틀 */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  비밀지원금 확인하기
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 성함 입력 */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">
                    성함
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* 연락처 입력 */}
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">
                    연락처
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                  />
                </div>

                {/* 개인정보 수집 이용 동의 박스 */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-2 text-xs text-slate-600">
                  <div className="flex gap-1.5">
                    <span className="font-semibold text-slate-700 shrink-0">① 수집 목적</span>
                    <span>: 가입 상담 및 신청</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="font-semibold text-slate-700 shrink-0">② 수집 항목</span>
                    <span>: 이름, 연락처</span>
                  </div>
                  <div className="space-y-1 pt-1 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-700 block">③ 보유, 이용기간</span>
                    <p className="text-[11px] text-slate-500 pl-2">· 개통 완료 시 : D+1095일</p>
                    <p className="text-[11px] text-slate-500 pl-2">· 단순 상담 시 : D+14일 후 파기</p>
                  </div>
                </div>

                {/* 체크박스 동의 */}
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs md:text-sm font-medium text-slate-800">
                    개인정보 수집 및 이용에 동의합니다 <span className="text-blue-600">(필수)</span>
                  </span>
                </label>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all text-base"
                >
                  상담 신청하기
                </button>
              </form>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. Swiper 배너 슬라이드 영역                                   */}
          {/* ========================================================= */}
          <div className="w-full lg:flex-1 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl">
            <Swiper 
              modules={[Autoplay, Pagination]} 
              loop={true} 
              autoplay={{ delay: 3000, disableOnInteraction: false }} 
              pagination={{ clickable: true }} 
              className="w-full h-[320px] md:h-[480px] lg:h-full min-h-[420px]" 
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={banner.id || index}>
                  <div className="w-full h-full relative bg-slate-900">
                    <img 
                      src={banner.image_url} 
                      alt={banner.title || '배너 이미지'} 
                      className="w-full h-full object-cover object-center" 
                    />
                    
                    {/* 이미지 위 텍스트 오버레이 */}
                    <div className="absolute bottom-[15%] left-[6%] right-[6%] text-white z-10 pointer-events-none">
                      <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold drop-shadow-md">
                        {banner.title}
                      </h2>
                      <p className="text-sm md:text-base lg:text-lg mt-2 text-slate-200 drop-shadow">
                        {banner.subtitle}
                      </p>
                    </div>

                    {/* 어두운 그라디언트 오버레이 (가독성 향상용) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </div>
  );
}