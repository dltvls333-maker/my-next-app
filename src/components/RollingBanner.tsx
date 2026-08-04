'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

// --- 1. 데이터 생성 로직 (원본 그대로 유지) ---
const generateRandomItems = (count: number) => {
  const banks = ['카카오뱅크', '신한은행', '국민은행', '하나은행', '우리은행'];
  const accountPatterns = ['3333-01', '110-32', '100-24', '285-09', '1002-45'];
  const descriptions = ['인터넷 지원금', '보조금', '', '', ''];
  const statuses = ['입금대기', '입금완료'];

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

    // 기타 데이터 생성
    const randomAmount = (Math.floor(Math.random() * (110 - 56 + 1)) + 56) * 10000;
    const randomPattern = accountPatterns[Math.floor(Math.random() * accountPatterns.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      bank: banks[Math.floor(Math.random() * banks.length)],
      amount: randomAmount.toLocaleString() + ' 원',
      status: randomStatus,
      account: `${randomPattern}-***${Math.floor(Math.random() * 9000 + 1000)}`,
      desc: randomDesc,
      date: dateString,
      // 상단바 시간용 (입금 시간과 동일하게 설정)
      topTime: `${hours}:${minutes}` 
    };
  });
};

// --- 2. 스타일 상수 ---
const CARD_WIDTH_MD = 280; // 카드 너비 고정

export default function RollingBanner() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // 충분한 양의 데이터 생성
    setItems(generateRandomItems(40));
  }, []);

  // Embla Carousel 설정: 한 줄로 무한 롤링
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      watchDrag: false // 자동 롤링만 되도록 드래그 방지
    }, 
    [
      AutoScroll({ 
        speed: 0.7, // 부드러운 속도
        stopOnInteraction: false, 
        stopOnMouseEnter: true, // 마우스 올리면 멈춤
      })
    ]
  );

  return (
    <div className="w-full bg-slate-50 py-16 md:py-20 overflow-hidden">
      <h3 className="text-center text-2xl md:text-3xl font-extrabold mb-12 md:mb-16 text-slate-900 tracking-tight">
        실시간 입금 현황
      </h3>
      
      {/* 롤링 배너 컨테이너 */}
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        {/* Flex 트랙 */}
        <div className="flex gap-5">
          {items.map((item, index) => (
            <div 
              key={`roll-${index}`} 
              // 카드 너비 고정, 간격 설정
              className="flex-[0_0_280px] h-[400px] select-none"
            >
              {/* --- 스마트폰 문자 카드 디자인 시작 --- */}
              <div className="w-full h-full bg-[#1e1e1e] rounded-[32px] p-6 flex flex-col text-white shadow-lg shadow-slate-200 border border-slate-700/50 relative overflow-hidden">
                
                {/* 아이폰 스타일 상단바 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-2xl z-10 flex items-center justify-between px-4">
                  <span className="text-[12px] font-semibold text-gray-100 tracking-tight">{item.topTime}</span>
                  {/* 카메라/센서 노치 */}
                  <div className="flex gap-1.5 items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-900 border border-gray-700"></div>
                  </div>
                </div>

                {/* 카드 내부 콘텐츠 (상단바 아래 여백 포함) */}
                <div className="flex flex-col flex-grow mt-10">
                  
                  {/* 헤더: 발신자 정보 */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                    {/* 발신자 아이콘 (단순화) */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-inner">
                      {item.bank.charAt(0)}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">[Web 발신]</div>
                      <div className="text-base text-gray-300">{item.bank}</div>
                    </div>
                  </div>

                  {/* 문자 본문 박스 (이미지의 회색 박스 영역) */}
                  <div className="bg-[#2c2c2c] rounded-3xl p-5 flex-grow flex flex-col justify-between border border-white/5">
                    <div>
                      {/* 계좌번호 (고정된 폰트 스타일) */}
                      <p className="text-gray-400 text-xs font-mono tracking-wide">{item.account}</p>
                      
                      {/* 입금 설명 (있을 때만 표시) */}
                      {item.desc && (
                        <p className="text-sm text-gray-300 mt-1">{item.desc}</p>
                      )}
                      
                      {/* 입금 금액 (강조 - 노란색) */}
                      <p className="text-3xl font-extrabold text-[#FFD700] tracking-tight mt-4 mb-1">
                        {item.amount}
                      </p>
                      
                      {/* 상태 (입금대기/완료 - 원본 색상 유지) */}
                      <span className={`inline-block text-sm font-semibold px-2.5 py-1 rounded-full mt-1 ${
                        item.status === '입금완료' ? 'bg-blue-950 text-blue-300' : 'bg-orange-950 text-orange-300'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* 하단 시간 정보 (원본 날짜 데이터) */}
                    <p className="text-xs text-gray-500 mt-5 border-t border-white/5 pt-2">
                      {item.date}
                    </p>
                  </div>

                  {/* 아이폰 홈버튼 라인 */}
                  <div className="w-1/3 h-1 bg-gray-700 rounded-full mx-auto mt-5"></div>
                </div>
              </div>
              {/* --- 디자인 끝 --- */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}