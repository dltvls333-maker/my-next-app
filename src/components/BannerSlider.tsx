'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function BannerSliderWithForm({ banners }: { banners: any[] }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 연락처 자동 하이픈 추가 및 유효성 검사 로직
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)) {
      setTimeout(() => alert('연락처는 숫자만 입력 가능합니다.'), 0);
      value = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    }
    const numbers = value.replace(/[^0-9]/g, '');
    let formattedValue = numbers;
    if (numbers.length > 3 && numbers.length <= 7) {
      formattedValue = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length > 7) {
      formattedValue = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
    setPhone(formattedValue);
  };

  // 실제 DB 전송을 위한 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('성함을 입력해주세요.');
      return;
    }
    if (phone.length < 12) {
      alert('올바른 연락처를 입력해주세요.');
      return;
    }
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('비밀지원금 신청이 정상적으로 접수되었습니다.');
        setName('');
        setPhone('');
        setAgreed(true);
      } else {
        alert(result.message || '신청 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-transparent py-6 md:py-10">
      <div className="w-full px-4 md:px-8">
        
        {/* 컨테이너: 모바일에서는 슬라이드가 위, 폼이 아래 / 데스크탑은 좌우 나란히 */}
        <div className="flex flex-col-reverse lg:flex-row items-stretch gap-6">
          
          {/* ========================================================= */}
          {/* 1. 비밀지원금 신청 폼 (DB 연동 및 유효성 검사 적용 완료)            */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[420px] bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-between shrink-0 border border-slate-100">
            <div>
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
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">
                    성함
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1.5">
                    연락처
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                    placeholder="010-1234-5678"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                    required
                  />
                </div>

                <div className="space-y-4">
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
                      id="agree"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-xs md:text-sm font-semibold text-slate-800">
                      개인정보 수집 및 이용에 동의합니다 <span className="text-blue-600">(필수)</span>
                    </span>
                  </label>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 bg-[#E7710F] active:scale-[0.98] text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all text-base disabled:bg-slate-400"
                >
                  {isSubmitting ? '처리 중...' : '비밀지원금 안내 받기'}
                </button>
              </form>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. Swiper 배너 슬라이드 영역 (PC / 모바일 이미지 분기)       */}
          {/* ========================================================= */}
     <div className="w-full lg:flex-1 lg:self-start overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
  <Swiper
    modules={[Autoplay, Pagination]}
    loop={true}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    pagination={{ clickable: true }}
    className="w-full"
  >
    {banners.map((banner, index) => (
      <SwiperSlide key={banner.id || index}>
        {/* 💡 핵심 1: 프레임 자체에 모바일(1/1 정사각형)과 PC(2329/1300 비율)의 실제 해상도 비율을 고정하여 빈 공간 차단 */}
        <div className="relative w-full overflow-hidden aspect-[1/1] md:aspect-[2329/1300]">

          {/* 모바일 배너 - 2048 × 2048 */}
          <img
            src={banner.link_url}
            alt={banner.title || '모바일 배너 이미지'}
            className="absolute inset-0 w-full h-full object-contain md:hidden"
          />

          {/* PC 배너 - 2329 × 1300 */}
          <img
            src={banner.image_url}
            alt={banner.title || 'PC 배너 이미지'}
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
          />

          {/* 텍스트 */}
          <div className="absolute bottom-[15%] left-[6%] right-[6%] text-white z-10 pointer-events-none">
            <h2 className="text-xl md:text-4xl lg:text-5xl font-extrabold drop-shadow-md tracking-tight">
              {banner.title}
            </h2>

            <p className="text-xs md:text-lg lg:text-xl mt-2 text-slate-200 drop-shadow">
              {banner.subtitle}
            </p>
          </div>

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