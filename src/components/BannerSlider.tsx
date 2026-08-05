'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerSliderWithForm({ banners }: { banners: any[] }) {
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
    alert('비밀지원금 신청이 정상적으로 접수되었습니다.');
  };

  return (
    <div className="w-full bg-transparent py-6 md:py-10">
      {/* 전체 화면 폭을 꽉 채우도록 설정 */}
      <div className="w-full px-4 md:px-8">
        
        {/* 컨테이너: 모바일에서는 슬라이드가 위, 폼이 아래 */}
        <div className="flex flex-col-reverse lg:flex-row items-stretch gap-6">
          
          {/* ========================================================= */}
          {/* 1. 비밀지원금 신청 폼                                       */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[420px] bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-between shrink-0 border border-slate-100">
            <div>
              {/* 타이틀 영역 */}
              <div className="mb-6 pb-4 border-b border-slate-100">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-2.5 py-1 rounded-full mb-2">
                  SPECIAL EVENT
                </span>
                <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                  비밀지원금 즉시 확인하기
                </h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  남겨주신 번호로 파격적인 지원금 혜택을 안내해 드립니다.
                </p>
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

                {/* PC 버전에서만 보이는 개인정보 수집 이용 동의 및 안내 박스 */}
                <div className="hidden md:block space-y-4">
                  <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 space-y-1.5 text-xs text-slate-600">
                    <div className="flex gap-1">
                      <span className="font-semibold text-slate-700">① 수집 목적:</span>
                      <span>가입 상담 및 지원금 안내</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="font-semibold text-slate-700">② 수집 항목:</span>
                      <span>이름, 연락처</span>
                    </div>
                    <div className="pt-1 border-t border-slate-200/60 mt-1">
                      <span className="font-semibold text-slate-700 block mb-0.5">③ 보유 및 이용기간:</span>
                      <p className="text-[11px] text-slate-500">· 개통 완료 시 : D+1095일</p>
                      <p className="text-[11px] text-slate-500">· 단순 상담 시 : D+14일 후 파기</p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs md:text-sm font-semibold text-slate-800">
                      개인정보 수집 및 이용에 동의합니다 <span className="text-blue-600">(필수)</span>
                    </span>
                  </label>
                </div>

                {/* 제출 버튼 */}
                <button
                  type="submit"
                  className="w-full mt-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all text-base"
                >
                  비밀지원금 문자 받기
                </button>
              </form>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. Swiper 배너 슬라이드 영역 (이미지 잘림 방지: object-contain 적용) */}
          {/* ========================================================= */}
          <div className="w-full lg:flex-1 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-slate-900">
            <Swiper 
              modules={[Autoplay, Pagination]} 
              loop={true} 
              autoplay={{ 
                delay: 3500, 
                disableOnInteraction: false 
              }} 
              pagination={{ clickable: true }} 
              className="w-full h-[320px] md:h-[480px] lg:h-full min-h-[320px]" 
            >
              {banners.map((banner, index) => (
                <SwiperSlide key={banner.id || index}>
                  {/* bg-slate-900 또는 이미지가 가진 여백 색상과 맞춘 배경을 주어 찌그러짐/잘림 없이 온전한 이미지가 중앙에 오도록 처리 */}
                  <div className="w-full h-full relative flex items-center justify-center bg-[#111827]">
                    <img 
                      src={banner.image_url} 
                      alt={banner.title || '배너 이미지'} 
                      className="w-full h-full object-contain object-center" 
                    />
                    
                    {/* 이미지 위 텍스트 오버레이 */}
                    <div className="absolute bottom-[15%] left-[6%] right-[6%] text-white z-10 pointer-events-none">
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-md tracking-tight">
                        {banner.title}
                      </h2>
                      <p className="text-sm md:text-lg lg:text-xl mt-3 text-slate-200 drop-shadow">
                        {banner.subtitle}
                      </p>
                    </div>

                    {/* 어두운 그라디언트 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"></div>
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