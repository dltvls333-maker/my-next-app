'use client';
import { useEffect } from 'react';
import React, { useState, Suspense, lazy } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import Skplan from '../../../components/Skplan';
import Ktplan from '../../../components/Ktplan';
import Lgplan from '../../../components/Lgplan';
import Skylifeplan from '../../../components/Skylifeplan';
import Lghellovisionplan from '../../../components/Lghellovisionplan';

const carriers = [
  { id: 'sk', name: "SK", img: "/brands/sk.png" },
  { id: 'kt', name: "KT", img: "/brands/kt.png" },
  { id: 'lg', name: "LG U+", img: "/brands/lg.png" },
  { id: 'lg_hellovision', name: "LG 헬로비전", img: "/brands/lg_hellovision.png" },
  { id: 'skylife', name: "스카이라이프", img: "/brands/skylife.png" },
];

export const CARRIER_PLANS = {
  sk: {
    internet: [
      { id: 100, label: '광랜 인터넷', desc: '1~2인 가구 추천', price: 23100 },
      { id: 500, label: '기가라이트 인터넷', desc: '3~4인 가구 추천', price: 34100 },
      { id: 1000, label: '기가 인터넷', desc: '방송 송출 및 전문작업용', price: 39600 },
    ],
    tv: [
      { id: 'economy', label: '이코노미', channels: '183채널', desc: '경제적인 금액대의 TV', price: 13200 },
      { id: 'standard', label: '스탠다드', channels: '236채널', desc: '실속형 TV', price: 16500 },
      { id: 'all', label: 'ALL', channels: '257채널', desc: '최다 채널 TV', price: 19800 },
    ]
  },
  kt: {
    internet: [
      { id: 100, label: '광랜 인터넷', desc: '1~2인 가구 추천', price: 23100 },
      { id: 500, label: '기가라이트 인터넷', desc: '3~4인 가구 추천', price: 34100 },
      { id: 1000, label: '기가 인터넷', desc: '방송 송출 및 전문작업용', price: 39600 },
    ],
    tv: [
      { id: 'basic', label: '베이직', channels: '236채널', desc: '경제적인 금액대의 TV', price: 13200 },
      { id: 'light', label: '라이트', channels: '240채널', desc: '실속형 TV', price: 16500 },
      { id: 'allG', label: '모든G', channels: '256채널', desc: '최다 채널 TV', price: 19800 },
    ]
  },
  lg: {
    internet: [
      { id: 100, label: '광랜 인터넷', desc: '1~2인 가구 추천', price: 22000 },
      { id: 500, label: '기가라이트 인터넷', desc: '3~4인 가구 추천', price: 33000 },
      { id: 1000, label: '기가 인터넷', desc: '방송 송출 및 전문작업용', price: 38500 },
    ],
    tv: [
      { id: 'simple', label: '실속형', channels: '217채널', desc: '경제적인 금액대의 TV', price: 15400 },
      { id: 'basic', label: '기본형', channels: '223채널', desc: '실속형 TV', price: 16500 },
      { id: 'premium', label: '프리미엄', channels: '252채널', desc: '최다 채널 TV', price: 18700 },
    ]
  },
  skylife: {
    internet: [
      { id: 100, label: '광랜 인터넷', desc: '1~2인 가구 추천', price: 24200 },
      { id: 500, label: '기가라이트 인터넷', desc: '3~4인 가구 추천', price: 30800 },
      { id: 1000, label: '기가 인터넷', desc: '방송 송출 및 전문작업용', price: 36300 },
    ],
    tv: [
      { id: 'basic', label: '베이직', channels: '207채널', desc: '경제적인 금액대의 TV', price: 13200 },
      { id: 'plus', label: '플러스', channels: '220채널', desc: '실속형 TV', price: 14300 },
      { id: 'all', label: 'ALL TV', channels: '238채널', desc: 'TV 단독 가입 가능', price: 13200 },
    ]
  },
  lg_hellovision: {
    internet: [
      { id: 100, label: '광랜 인터넷', desc: '1~2인 가구 추천', price: 20790 },
      { id: 500, label: '기가라이트 인터넷', desc: '3~4인 가구 추천', price: 30360 },
      { id: 1000, label: '기가 인터넷', desc: '방송 송출 및 전문작업용', price: 31900 },
    ],
    tv: [
      { id: 'economy', label: '이코노미', channels: '109채널', desc: '경제적인 금액대의 TV', price: 11000 },
      { id: 'new_basic', label: '뉴베이직', channels: '245채널', desc: '실속형 TV', price: 13200 },
      { id: 'new_premium', label: '뉴프리미엄', channels: '245채널', desc: '최다 채널 TV', price: 15400 },
    ]
  }
};

export default function InternetCarrierPage() {
  const [startIndex, setStartIndex] = useState(0);
  const totalPages = Math.ceil(carriers.length / 3);

  const [selectedCarrier, setSelectedCarrier] = useState(carriers[0]);
  const [selectedPlan, setSelectedPlan] = useState(CARRIER_PLANS.sk.internet[0]);
  // TV는 최초 진입 시 선택되지 않도록 null로 설정 (요금 계산 시 0원 처리)
  const [selectedTv, setSelectedTv] = useState(null);

  const handlePrev = () => setStartIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setStartIndex((prev) => Math.min(prev + 1, totalPages - 1));

  const handleCarrierChange = (c: any) => {
    setSelectedCarrier(c);
    const newData = CARRIER_PLANS[c.id as keyof typeof CARRIER_PLANS];
    setSelectedPlan(newData.internet[0]);
    setSelectedTv(null); // 통신사 변경 시에도 TV는 초기화(선택 안 됨)
  };

  const currentData = CARRIER_PLANS[selectedCarrier.id];

  // 금액 계산
  const pricePlan = typeof selectedPlan.price === 'string' 
    ? Number(selectedPlan.price.replace(/,/g, '')) 
    : selectedPlan.price;

  const priceTv = selectedTv 
    ? (typeof selectedTv.price === 'string' ? Number(selectedTv.price.replace(/,/g, '')) : selectedTv.price)
    : 0;

  useEffect(() => {
    // 통신사가 바뀔 때 현재 선택된 TV가 해당 통신사에 존재하지 않으면 초기화
    if (selectedTv) {
      const currentTvList = CARRIER_PLANS[selectedCarrier.id].tv;
      const isSelectedValid = currentTvList.find(t => t.id === selectedTv.id);
      if (!isSelectedValid) {
        setSelectedTv(null);
      }
    }
  }, [selectedCarrier, selectedTv]);

  const totalMonthlyPrice = pricePlan + priceTv;

  const CARRIER_COMPONENTS: { [key: string]: JSX.Element } = {
    sk: <Skplan />,
    kt: <Ktplan />,
    lg: <Lgplan />,
    lghellovision: <Lghellovisionplan />,
    lg_hellovision: <Lghellovisionplan />,
    skylife: <Skylifeplan />,
  };

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">원하시는 상품을 선택해주세요.</h1>

      {/* 통신사 선택 섹션 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">통신사</h2>
        <div className="flex-1 overflow-hidden mb-6">
          <div 
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${startIndex * 100}%)` }}
          >
            {carriers.map((c) => (
              <button 
                key={c.id} 
                onClick={() => handleCarrierChange(c)}
                className={`cursor-pointer p-4 border rounded-xl text-center shrink-0 w-[calc(33.333%-11px)] transition-all ${
                  selectedCarrier.id === c.id 
                    ? 'border-[#0f382b] bg-[#eef4f1]/50 ring-2 ring-[#0f382b]/20' 
                    : 'border-gray-200 hover:border-[#0f382b]/50'
                }`}
              >
                <div className="h-16 flex items-center justify-center mb-2">
                  <img src={c.img} alt={c.name} className="max-h-full object-contain" />
                </div>
                <div className="text-sm font-bold">{c.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 페이지네이션 및 화살표 조작부 */}
        <div className="flex items-center justify-center gap-4">
          <button 
            onClick={handlePrev} 
            disabled={startIndex === 0}
            className="cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setStartIndex(idx)}
                className={`cursor-pointer w-3 h-3 rounded-full transition-all ${
                  startIndex === idx ? 'bg-[#0f382b] w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext} 
            disabled={startIndex === totalPages - 1}
            className="cursor-pointer p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-30 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      {/* 인터넷 섹션 */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">인터넷 - {selectedCarrier.name} 전용 상품</h2>
        <div className="flex flex-wrap gap-2 md:gap-4">
          {currentData.internet.map((plan) => (
            <button 
              key={plan.id} 
              onClick={() => setSelectedPlan(plan)} 
              className={`cursor-pointer p-3 md:p-6 border rounded-2xl w-[calc(33.333%-7px)] flex-1 text-left transition-all ${
                selectedPlan.id === plan.id 
                  ? 'border-[#0f382b] bg-[#eef4f1]/50 shadow-md ring-2 ring-[#0f382b]/20' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-[10px] md:text-sm text-[#0f382b] font-medium truncate">{plan.label}</div>
              <div className="text-xs md:text-2xl font-bold my-1">
                {plan.id >= 1000 ? '1Gbps' : `${plan.id}Mbps`}
              </div>
              <div className="text-[9px] md:text-sm text-gray-500 truncate">{plan.desc}</div>
              <div className="text-[10px] md:text-lg font-bold text-[#0f382b] mt-2">월 {plan.price.toLocaleString()}원</div>
            </button>
          ))}
        </div>
      </section>

      {/* TV 채널 섹션 (초기 비선택 상태 지원) */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">TV (선택사항)</h2>
          {selectedTv && (
            <button 
              onClick={() => setSelectedTv(null)}
              className="text-xs text-stone-500 underline hover:text-red-500 cursor-pointer"
            >
              TV 선택 해제하기
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 md:gap-4">
          {currentData.tv.map((plan) => {
            const isSelected = selectedTv?.id === plan.id;
            return (
              <button 
                key={plan.id} 
                onClick={() => setSelectedTv(isSelected ? null : plan)}
                className={`cursor-pointer p-3 md:p-6 border rounded-2xl w-[calc(33.333%-7px)] flex-1 text-left transition-all ${
                  isSelected 
                    ? 'border-[#0f382b] bg-[#eef4f1]/50 shadow-md ring-2 ring-[#0f382b]/20' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-[10px] md:text-sm text-[#0f382b] font-medium truncate">{plan.label}</div>
                <div className="text-xs md:text-2xl font-bold my-1 truncate">{plan.channels}</div>
                <div className="text-[9px] md:text-sm text-gray-500 truncate mb-2">{plan.desc}</div>
                <div className="text-[10px] md:text-lg font-bold text-[#0f382b]">월 {plan.price.toLocaleString()}원</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 예상 금액 결과 박스 (그린 톤 적용) */}
      <section className="mt-8 mb-20">
        <div className="relative bg-[#0f382b] rounded-2xl p-6 md:p-8 text-white shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
          
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-base md:text-xl font-bold text-white mb-1">매월 납부하실 예상 금액</h3>
              <p className="text-xs md:text-sm text-emerald-100/90">
                {selectedPlan.label} {selectedTv ? `+ ${selectedTv.label} TV` : "(TV 미선택 - 요금 미포함)"} 요금 합계입니다.
              </p>
            </div>

            <div className="text-center md:text-right">
              <div className="text-2xl md:text-4xl font-extrabold tracking-tight">
                <span className="text-base md:text-xl mr-2 font-medium opacity-90">예상 월 요금 :</span>
                <span className="text-yellow-300">{totalMonthlyPrice.toLocaleString()}</span>원
              </div>
              <div className="mt-1 text-xs md:text-sm opacity-80 font-medium">
                3년 약정 기준 / VAT 포함
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 하단 통신사별 상세 플랜 컴포넌트 */}
      {CARRIER_COMPONENTS[selectedCarrier.id] || <div>통신사를 선택해주세요.</div>}
    </main>
  );
}