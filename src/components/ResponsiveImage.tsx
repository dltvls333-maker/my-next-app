import React from 'react';
import { MessageSquare, FileText, CalendarCheck, Wallet, Headphones, ChevronRight } from 'lucide-react';

const ResponsiveImage = () => {
  // 바로넷 가입 절차 데이터
  const steps = [
    {
      step: '01',
      title: '친절상담',
      desc: '전문 상담사 무료상담',
      icon: <MessageSquare className="w-7 h-7 text-[#0A685D]" />,
      active: true, // 첫 번째 단계 강조
    },
    {
      step: '02',
      title: '설치일정',
      desc: '신청 후 신속한 일정 조율',
      icon: <FileText className="w-7 h-7 text-slate-600" />,
      active: false,
    },
    {
      step: '03',
      title: '기사방문',
      desc: '전문 기사님 안전 방문 설치',
      icon: <CalendarCheck className="w-7 h-7 text-slate-600" />,
      active: false,
    },
    {
      step: '04',
      title: '혜택지급',
      desc: '설치 완료 당일 현금 지급',
      icon: <Wallet className="w-7 h-7 text-slate-600" />,
      active: false,
    },
    {
      step: '05',
      title: '평생관리',
      desc: '바로넷만의 안심 케어',
      icon: <Headphones className="w-7 h-7 text-slate-600" />,
      active: false,
    },
  ];

  return (
    <div className="w-full bg-slate-50/60 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 상단 타이틀 영역 */}
        <div className="text-center flex flex-col items-center mb-10 md:mb-14">
          <span className="inline-block bg-[#0A685D]/10 text-[#0A685D] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-3 tracking-wide">
            상담부터 설치, 현금 입금까지!
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            바로넷 <span className="text-[#0A685D]">원스톱 서비스</span>
          </h2>
          <p className="text-xs md:text-base text-slate-500 mt-2">
            귀찮을 일 없이 빠르고 편안하게 가입을 도와드립니다.
          </p>
        </div>

        {/* 5단계 가입절차 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 items-center relative">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              
              {/* 카드 본체 */}
              <div 
                className={`relative bg-white rounded-2xl md:rounded-3xl p-6 transition-all duration-300 flex flex-col items-center text-center shadow-sm hover:shadow-xl border ${
                  item.active 
                    ? 'border-[#0A685D] ring-4 ring-[#0A685D]/10 bg-gradient-to-b from-white to-[#0A685D]/[0.02]' 
                    : 'border-slate-100 hover:border-slate-200'
                }`}
              >
                {/* 상단 스텝 번호 */}
                <span className={`text-xs font-black mb-3 px-2.5 py-0.5 rounded-md ${
                  item.active ? 'bg-[#0A685D] text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  STEP {item.step}
                </span>

                {/* 아이콘 박스 */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                  item.active ? 'bg-[#0A685D]/10' : 'bg-slate-50'
                }`}>
                  {item.icon}
                </div>

                {/* 텍스트 내용 */}
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* PC 버전 카드 사이 연결 화살표 (마지막 카드 제외) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-md items-center justify-center text-slate-400">
                  <ChevronRight className="w-4 h-4" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ResponsiveImage;