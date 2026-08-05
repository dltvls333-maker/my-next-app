'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

// --- 1. 데이터 생성 로직 (원본 유지) ---
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
      topTime: `${hours}:${minutes}` 
    };
  });
};

export default function RollingBanner() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(generateRandomItems(40));
  }, []);

  // Embla Carousel 설정 (속도를 살짝 높여 반응성 체감 개선)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      watchDrag: false 
    }, 
    [
      AutoScroll({ 
        speed: 1.2, // 속도감 조절 (기존 0.7 -> 1.2)
        stopOnInteraction: false, 
        stopOnMouseEnter: false, 
      })
    ]
  );

  // 마우스 올렸을 때 즉시 멈추고 뗄 때 즉시 시작하도록 핸들러 추가
  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const viewportNode = emblaApi.rootNode();

    const onMouseEnter = () => {
      autoScroll.stop();
    };

    const onMouseLeave = () => {
      autoScroll.play();
    };

    viewportNode.addEventListener('mouseenter', onMouseEnter);
    viewportNode.addEventListener('mouseleave', onMouseLeave);

    return () => {
      viewportNode.removeEventListener('mouseenter', onMouseEnter);
      viewportNode.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [emblaApi]);

  return (
    <div className="w-full bg-slate-50 py-12 md:py-20">
      {/* 1240px 제한 및 overflow-hidden 적용 */}
      <div className="max-w-[1240px] mx-auto px-4 overflow-hidden">
        <h3 className="text-center text-xl md:text-3xl font-extrabold mb-8 md:mb-16 text-slate-900 tracking-tight">
          실시간 입금 현황
        </h3>
        
        {/* 롤링 배너 컨테이너 */}
        <div className="relative w-full overflow-hidden py-4" ref={emblaRef}>
          {/* Flex 트랙 */}
          <div className="flex gap-3 md:gap-5">
            {items.map((item, index) => (
              <div 
                key={`roll-${index}`} 
                className="flex-[0_0_210px] md:flex-[0_0_280px] h-[310px] md:h-[400px] select-none"
              >
                {/* --- 스마트폰 문자 카드 디자인 (호버 애니메이션 적용) --- */}
                <div className="w-full h-full bg-[#1e1e1e] rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col text-white shadow-lg shadow-slate-200 border border-slate-700/50 relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/50 cursor-pointer">
                  
                  {/* 상단바 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 md:h-7 bg-black rounded-b-xl z-10 flex items-center justify-between px-3 md:px-4">
                    <span className="text-[10px] md:text-[12px] font-semibold text-gray-100 tracking-tight">{item.topTime}</span>
                    <div className="flex gap-1 items-center">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-700"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-900 border border-gray-700"></div>
                    </div>
                  </div>

                  {/* 카드 내부 콘텐츠 */}
                  <div className="flex flex-col flex-grow mt-6 md:mt-10">
                    
                    {/* 헤더 */}
                    <div className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-6 pb-3 md:pb-4 border-b border-white/5">
                      <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-lg md:text-2xl font-bold shadow-inner flex-shrink-0">
                        {item.bank.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs md:text-lg font-bold text-white truncate">[Web 발신]</div>
                        <div className="text-xs md:text-base text-gray-300 truncate">{item.bank}</div>
                      </div>
                    </div>

                    {/* 문자 본문 박스 */}
                    <div className="bg-[#2c2c2c] rounded-2xl md:rounded-3xl p-3.5 md:p-5 flex-grow flex flex-col justify-between border border-white/5">
                      <div>
                        <p className="text-[11px] md:text-xs text-gray-400 font-mono tracking-wide">{item.account}</p>
                        
                        {item.desc && (
                          <p className="text-xs md:text-sm text-gray-300 mt-0.5">{item.desc}</p>
                        )}
                        
                        {/* 금액 */}
                        <p className="text-xl md:text-3xl font-extrabold text-[#FFD700] tracking-tight mt-2 md:mt-4 mb-1">
                          {item.amount}
                        </p>
                        
                        {/* 상태 */}
                        <span className={`inline-block text-[11px] md:text-sm font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full mt-0.5 md:mt-1 ${
                          item.status === '입금완료' ? 'bg-blue-950 text-blue-300' : 'bg-orange-950 text-orange-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      {/* 날짜 */}
                      <p className="text-[10px] md:text-xs text-gray-500 mt-3 md:mt-5 border-t border-white/5 pt-1.5 md:pt-2">
                        {item.date}
                      </p>
                    </div>

                    {/* 홈버튼 라인 */}
                    <div className="w-1/3 h-1 bg-gray-700 rounded-full mx-auto mt-3 md:mt-5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}