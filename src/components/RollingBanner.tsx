'use client';

import React, { useMemo, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

const generateRandomItems = (count: number) => {
  const banks = ['카카오뱅크', '신한은행', '국민은행', '하나은행', '우리은행'];
  const accountPatterns = ['3333-01', '110-32', '100-24', '285-09', '1002-45'];
  const descriptions = ['인터넷 지원금', '보조금', '', '', ''];
  const statuses = ['입금대기', '입금완료']; // 랜덤 상태 배열
  return Array.from({ length: count }).map(() => {
    // 1. 랜덤 날짜 생성 (오늘 기준 0~6일 전)
    const randomDays = Math.floor(Math.random() * 7);
    const date = new Date();
    date.setDate(date.getDate() - randomDays);
    
    // MM/DD HH:mm 형식으로 변환
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const dateString = `${month}/${day} ${hours}:${minutes}`;

    // 2. 기타 데이터 생성
    const randomAmount = (Math.floor(Math.random() * (110 - 56 + 1)) + 56) * 10000;
    const randomPattern = accountPatterns[Math.floor(Math.random() * accountPatterns.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]; // 상태 랜덤 선택
    return {
      bank: banks[Math.floor(Math.random() * banks.length)],
      amount: randomAmount.toLocaleString() + ' 원',
      status: randomStatus,
      account: `${randomPattern}-***${Math.floor(Math.random() * 9000 + 1000)}`,
      desc: randomDesc,
      date: dateString // 👈 날짜 필드 추가 완료!
    };
  });
};

export default function RollingBanner() {
  const [items1, setItems1] = useState<any[]>([]);
  const [items2, setItems2] = useState<any[]>([]);

  useEffect(() => {
    setItems1(generateRandomItems(30));
    setItems2(generateRandomItems(30));
  }, []);

  const [emblaRef1] = useEmblaCarousel({ loop: true }, [AutoScroll({ speed: 1, stopOnInteraction: false })]);
  const [emblaRef2] = useEmblaCarousel({ loop: true }, [AutoScroll({ speed: 1, stopOnInteraction: false, direction: 'backward' })]);

  const cardClass = "flex-[0_0_160px] md:flex-[0_0_240px] bg-white border border-slate-200 rounded-xl p-4 md:p-5 shadow-sm text-center mx-2 md:mx-3";

  return (
    <div className="w-full max-w-[1240px] mx-auto py-10 md:py-16 overflow-hidden">
      <h3 className="text-center text-xl md:text-2xl font-semibold mb-8 md:mb-12 text-slate-700">실제 입금 현황</h3>
      
      {/* 1번 배너 */}
      <div className="overflow-hidden mb-6 md:mb-8" ref={emblaRef1}>
        <div className="flex">
          {items1.map((item, index) => (
            <div key={`r1-${index}`} className={cardClass}>
              <div className="text-[10px] md:text-[11px] text-slate-400 mb-1">[Web 발신]</div>
              <div className="text-xs md:text-sm font-bold text-slate-600">{item.bank}</div>
              <div className="text-[10px] md:text-[11px] text-slate-400 font-mono mt-0.5">{item.date}</div>
              <div className="text-[10px] md:text-[11px] text-slate-400 font-mono mt-0.5">{item.account}</div>
              <div className="text-[10px] md:text-xs text-slate-500 mt-1 h-3 md:h-4">{item.desc}</div>
              {/* 수정된 금액 및 상태 영역 */}
              <div className="mt-2 md:mt-3">
                <div className="text-sm md:text-lg font-bold text-slate-800">{item.amount}</div>
                <div className={`text-[10px] md:text-xs mt-0.5 font-semibold ${item.status === '입금완료' ? 'text-blue-600' : 'text-orange-500'}`}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2번 배너 */}
      <div className="overflow-hidden" ref={emblaRef2}>
        <div className="flex">
          {items2.map((item, index) => (
            <div key={`r2-${index}`} className={cardClass}>
              <div className="text-[10px] md:text-[11px] text-slate-400 mb-1">[Web 발신]</div>
              <div className="text-xs md:text-sm font-bold text-slate-600">{item.bank}</div>
              <div className="text-[10px] md:text-[11px] text-slate-400 font-mono mt-0.5">{item.date}</div>
              <div className="text-[10px] md:text-[11px] text-slate-400 font-mono mt-0.5">{item.account}</div>
              <div className="text-[10px] md:text-xs text-slate-500 mt-1 h-3 md:h-4">{item.desc}</div>
              {/* 수정된 금액 및 상태 영역 */}
              <div className="mt-2 md:mt-3">
                <div className="text-sm md:text-lg font-bold text-slate-800">{item.amount}</div>
                <div className={`text-[10px] md:text-xs mt-0.5 font-semibold ${item.status === '입금완료' ? 'text-blue-600' : 'text-orange-500'}`}>
                  {item.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}