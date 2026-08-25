'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

// --- 은행별 정확한 패턴 및 고유 색상 설정 (인라인 스타일용 HEX 값 적용) ---
const bankList = [
  { name: '국민은행', pattern: '4363', bgColor: '#FFCC00', textColor: '#222222', short: '국' },
  { name: '신한은행', pattern: '110', bgColor: '#0046FF', textColor: '#ffffff', short: '신' },
  { name: '카카오뱅크', pattern: '3333', bgColor: '#FEE500', textColor: '#3C1E1E', short: '카' },
  { name: '우리은행', pattern: '1002', bgColor: '#0072CE', textColor: '#ffffff', short: '우' },
  { name: '하나은행', pattern: '506', bgColor: '#00857E', textColor: '#ffffff', short: '하' },
];

// --- 데이터 생성 로직 ---
const generateRandomItems = (count: number) => {
  const descriptions = ['인터넷 지원금', '보조금', '', '', ''];
  const statuses = ['입금대기', '입금완료'];

  return Array.from({ length: count }).map(() => {
    // 랜덤 날짜 생성 (오늘 기준 0~6일 전)
    const randomDays = Math.floor(Math.random() * 7);
    const date = new Date();
    date.setDate(date.getDate() - randomDays);
    
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);

    date.setHours(randomHours);
    date.setMinutes(randomMinutes);
    
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hoursStr = randomHours.toString().padStart(2, '0');
    const minutesStr = randomMinutes.toString().padStart(2, '0');
    const dateString = `${month}/${day} ${hoursStr}:${minutesStr}`;

    // 은행 랜덤 선택
    const selected = bankList[Math.floor(Math.random() * bankList.length)];

    // 계좌번호 조합 (지정된 패턴으로 정확히 시작)
    const randomMiddle = Math.floor(Math.random() * 90 + 10);
    const randomTail = Math.floor(Math.random() * 9000 + 1000);
    const formattedAccount = `${selected.pattern}-${randomMiddle}-***${randomTail}`;

    const randomAmount = (Math.floor(Math.random() * (110 - 56 + 1)) + 56) * 10000;
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      bank: selected.name,
      short: selected.short,
      bgColor: selected.bgColor,
      textColor: selected.textColor,
      amount: randomAmount.toLocaleString() + ' 원',
      status: randomStatus,
      account: formattedAccount,
      desc: randomDesc,
      date: dateString,
      topTime: `${hoursStr}:${minutesStr}` 
    };
  });
};

export default function RollingBanner() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setItems(generateRandomItems(40));
  }, []);

  // Embla Carousel 설정
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start',
      watchDrag: false 
    }, 
    [
      AutoScroll({ 
        speed: 1.2, 
        stopOnInteraction: false, 
        stopOnMouseEnter: false, 
      })
    ]
  );

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
      <div className="max-w-[1240px] mx-auto px-4 overflow-hidden">
        <h3 className="text-center text-xl md:text-3xl font-extrabold mb-8 md:mb-16 text-slate-900 tracking-tight">
          실시간 입금 현황
        </h3>
        
        <div className="relative w-full overflow-hidden py-4" ref={emblaRef}>
          <div className="flex gap-3 md:gap-5">
            {items.map((item, index) => (
              <div 
                key={`roll-${index}`} 
                className="flex-[0_0_210px] md:flex-[0_0_280px] h-[310px] md:h-[400px] select-none"
              >
                <div className="w-full h-full bg-[#1e1e1e] rounded-[24px] md:rounded-[32px] p-4 md:p-6 flex flex-col text-white shadow-lg shadow-slate-200 border border-slate-700/50 relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/50 cursor-pointer">
                  
                  {/* 상단바 */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 md:h-7 bg-black rounded-b-xl z-10 flex items-center justify-between px-3 md:px-4">
                    <span className="text-[10px] md:text-[12px] font-semibold text-gray-100 tracking-tight">{item.topTime}</span>
                    <div className="flex gap-1 items-center">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-gray-700"></div>
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-gray-900 border border-gray-700"></div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow mt-6 md:mt-10">
                    
                    {/* 헤더 아이콘 및 은행명 (인라인 스타일 적용으로 색상 누락 방지) */}
                    <div className="flex items-center gap-2.5 md:gap-3 mb-3 md:mb-6 pb-3 md:pb-4 border-b border-white/5">
                      <div 
                        style={{ backgroundColor: item.bgColor, color: item.textColor }}
                        className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-lg font-bold shadow-inner flex-shrink-0"
                      >
                        {item.short}
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
                        
                        <p className="text-xl md:text-3xl font-extrabold text-[#FFD700] tracking-tight mt-2 md:mt-4 mb-1">
                          {item.amount}
                        </p>
                        
                        <span className={`inline-block text-[11px] md:text-sm font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full mt-0.5 md:mt-1 ${
                          item.status === '입금완료' ? 'bg-blue-950 text-blue-300' : 'bg-orange-950 text-orange-300'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <p className="text-[10px] md:text-xs text-gray-500 mt-3 md:mt-5 border-t border-white/5 pt-1.5 md:pt-2">
                        {item.date}
                      </p>
                    </div>

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