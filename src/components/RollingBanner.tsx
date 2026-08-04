'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

// --- 데이터 생성 로직 (유지) ---
const generateRandomItems = (count: number) => {
  const banks = ['신한은행', '기업은행', '수협', '국민은행', '하나은행'];
  // 은행 이름에 맞는 로고 아이콘 매핑 추가
  const bankLogos: { [key: string]: string } = {
    '신한은행': '🟠', // 실제 앱 로고 대신 이모지 사용 (또는 이미지 URL)
    '기업은행': '🔵',
    '수협': '🟦',
    '국민은행': '🟨',
    '하나은행': '🟢',
  };
  
  const descriptions = ['정부지원금', '대출 지원금', '소상공인 지원', '청년 지원금', '긴급생계비'];
  // 이미지와 같이 고정된 문구 사용
  const statusText = "입금되었습니다"; 

  return Array.from({ length: count }).map(() => {
    // 랜덤 날짜 생성 (오늘 기준 0~6일 전)
    const randomDays = Math.floor(Math.random() * 7);
    const date = new Date();
    date.setDate(date.getDate() - randomDays);
    
    // MM/DD HH:mm 형식으로 변환
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const dateString = `${month}/${day} ${hours}:${minutes}`;

    // 금액 랜덤 생성 (50만원 ~ 200만원)
    const randomAmount = (Math.floor(Math.random() * (200 - 50 + 1)) + 50) * 10000;
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const bank = banks[Math.floor(Math.random() * banks.length)];

    return {
      bank,
      logo: bankLogos[bank],
      amount: randomAmount.toLocaleString() + '원',
      desc: randomDesc,
      date: dateString,
      // 상단바 시간용 랜덤 시간
      topTime: `${hours}:${minutes}` 
    };
  });
};

// --- 스타일 상수 ---
// 스마트폰 카드 스타일
const CARD_WIDTH_MD = 260; // 모바일 카드 너비
const CARD_GAP = 16; // 카드 간격 (tailwind gap-4)

export default function RollingBanner() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // 한 줄로 롤링하므로 충분한 양의 데이터를 생성합니다.
    setItems(generateRandomItems(40));
  }, []);

  // Embla Carousel 설정: 한 줄로 무한 롤링
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      // 드래그 방지 (자동 롤링만 원할 경우)
      watchDrag: false 
    }, 
    [
      AutoScroll({ 
        speed: 0.8, // 스피드 조절
        stopOnInteraction: false, 
        stopOnMouseEnter: true, // 마우스 올리면 멈춤
        rootNode: (emblaRoot) => emblaRoot.parentElement // 부모 컨테이너 기준 스크롤
      })
    ]
  );

  return (
    <div className="w-full bg-slate-50 py-16 md:py-24 overflow-hidden">
      <h3 className="text-center text-2xl md:text-3xl font-bold mb-12 md:mb-16 text-slate-900 tracking-tight">
        실시간 입금 현황
      </h3>
      
      {/* 롤링 배너 컨테이너 */}
      <div className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        {/* Flex 컨테이너 (트랙) */}
        <div className="flex gap-4">
          {items.map((item, index) => (
            <div 
              key={`roll-${index}`} 
              className="flex-[0_0_260px] h-[380px] select-none"
            >
              {/* --- 이미지와 동일한 스마트폰 카드 디자인 시작 --- */}
              <div className="w-full h-full bg-[#1e1e1e] rounded-[32px] p-6 flex flex-col text-white shadow-2xl shadow-slate-200 border border-slate-700/50 relative overflow-hidden">
                
                {/* 노치 스타일 상단바 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-2xl z-10 flex items-center justify-center px-4">
                  <span className="text-[11px] font-medium text-gray-300 tracking-wider">{item.topTime}</span>
                  {/* 카메라/센서 구멍 */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
                  </div>
                </div>

                {/* 카드 내부 콘텐츠 (상단바 아래 여백 포함) */}
                <div className="flex flex-col flex-grow mt-8">
                  
                  {/* 헤더: 은행 로고 및 이름 */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-3xl border border-white/10 backdrop-blur-sm">
                      {item.logo}
                    </div>
                    <div>
                      <div className="text-xl font-semibold text-white tracking-tight">{item.bank}</div>
                      <div className="text-sm text-gray-400 font-normal">입금 알림</div>
                    </div>
                  </div>

                  {/* 알림 본문 박스 */}
                  <div className="bg-[#2c2c2c] rounded-3xl p-6 flex-grow border border-white/5">
                    <p className="text-gray-300 text-sm mb-2">{item.bank} 알림</p>
                    <p className="text-2xl font-bold text-white mb-6 leading-tight">{item.desc}</p>
                    
                    {/* 입금 금액 (강조 - 노란색) */}
                    <p className="text-[42px] font-extrabold text-[#FFD700] tracking-tight mb-2 drop-shadow-sm">
                      {item.amount}
                    </p>
                    
                    {/* 상태 및 시간 */}
                    <p className="text-lg font-semibold text-white opacity-90">{item.statusText || '입금되었습니다'}</p>
                    <p className="text-sm text-gray-400 mt-1.5">입금일시 {item.date}</p>
                  </div>

                  {/* 하단 작은 인디케이터바 (아이폰 홈버튼 라인) */}
                  <div className="w-1/3 h-1 bg-gray-700 rounded-full mx-auto mt-6"></div>
                </div>
              </div>
              {/* --- 디자인 끝 --- */}
            </div>
          ))}
        </div>
      </div>

      {/* 그라데이션 오버레이 (양옆 자연스럽게 사라짐) */}
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-50 to-transparent z-20"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-50 to-transparent z-20"></div> */}
    </div>
  );
}