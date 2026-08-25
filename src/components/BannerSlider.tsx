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

  // 연락처 자동 하이픈 추가 및 유효성 검사 로직 (서버 연동 100% 유지)
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

  // 실제 DB 전송을 위한 폼 제출 핸들러 (서버 연동 100% 유지)
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
      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* 
          [핵심 반응형 레이아웃]
          - 모바일/태블릿 (화면이 좁을 때): 세로 상하 배치 (flex-col) -> 폼이 배너 아래로 툭 떨어짐
          - PC (lg: 1024px 이상 넓은 화면): 배너와 폼이 한 공간에 겹쳐서(Relative/Absolute) 배치됨
        */}
        <div className="flex flex-col lg:block relative w-full gap-6 lg:gap-0">
          
          {/* 1. Swiper 배너 슬라이드 영역 (PC에서는 배경처럼 깔리고, 모바일에서는 위쪽에 위치) */}
          <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-transparent">
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
                  {/* PC에서는 고유 비율과 min-h를 주어 이미지가 너무 찌그러지지 않게 방어 */}
                  <div className="relative w-full overflow-hidden min-h-[320px] md:min-h-[500px] lg:min-h-[560px] flex items-center">

                    {/* 모바일 배너 */}
                    <img
                      src={banner.link_url}
                      alt={banner.title || '모바일 배너 이미지'}
                      className="absolute inset-0 w-full h-full block md:hidden object-cover"
                    />

                    {/* PC 배너 */}
                    <img
                      src={banner.image_url}
                      alt={banner.title || 'PC 배너 이미지'}
                      className="absolute inset-0 w-full h-full hidden md:block object-cover"
                    />

                    {/* 배경 어둡게 처리 (선택사항이나 텍스트/폼 가독성을 위해 은은한 다크 오버레이 추가 가능, 원치 않으면 삭제 가능) */}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />

                    {/* 텍스트 영역 (PC에서는 왼쪽에 폼이 들어갈 자리를 비워두기 위해 오른쪽으로 밀어줌) */}
                    <div className="relative z-10 w-full px-6 md:px-12 lg:pl-[460px] text-white pointer-events-none">
                      <h2 className="text-xl md:text-3xl lg:text-4xl font-extrabold drop-shadow-md tracking-tight leading-snug">
                        {banner.title}
                      </h2>

                      <p className="text-xs md:text-base lg:text-lg mt-3 text-slate-200 drop-shadow whitespace-pre-line leading-relaxed">
                        {banner.subtitle}
                      </p>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 
            2. 비밀지원금 신청 폼 영역 
            - 모바일/태블릿: 자연스럽게 배너 아래에 흐름 배치 (relative)
            - PC (lg 이상): 배너 이미지 위 왼쪽편에 둥둥 떠서 겹쳐짐 (absolute top-1/2 -translate-y-1/2 left-6)
          */}
          <div className="w-full lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-6 lg:w-[420px] lg:z-20 bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100">
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
                className="w-full mt-3 bg-[#E7710F] active:scale-[0.98] text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all text-base disabled:bg-slate-400 cursor-pointer"
              >
                {isSubmitting ? '처리 중...' : '비밀지원금 안내 받기'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}