import React from 'react';

const CompanyIntro = () => {
  return (
    <div className="w-full bg-slate-50/60 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 상단 타이틀 영역 (가입절차 컴포넌트와 동일한 폰트/색상 일치) */}
        <div className="text-center flex flex-col items-center mb-12 md:mb-16">
          <span className="inline-block bg-[#0A685D]/10 text-[#0A685D] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-3 tracking-wide">
            바로넷은 다릅니다!
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            혜택은 더하고, <span className="text-[#0A685D]">부담은 덜었습니다.</span>
          </h2>
          <p className="text-xs md:text-base text-slate-500 mt-2">
            고객님의 현명한 통신 생활을 위한 바로넷만의 4가지 약속입니다.
          </p>
        </div>

        {/* 4개 카드 그리드 영역 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 01 */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl border border-slate-100 hover:border-[#0A685D]/30 group">
            <div className="w-14 h-14 rounded-2xl bg-[#0A685D]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A685D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
              01. 최적의 요금 설계!
            </h3>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              불필요한 고가 요금제 권유 없이 고객님께 꼭 필요한 맞춤 설계는 물론, 놓치기 쉬운 결합 할인까지 꼼꼼하게 챙겨드립니다.
            </p>
          </div>

          {/* Card 02 */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl border border-slate-100 hover:border-[#0A685D]/30 group">
            <div className="w-14 h-14 rounded-2xl bg-[#0A685D]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A685D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
              02. 최대 혜택 보장
            </h3>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              광고비와 유통 수수료를 줄여 고객님께 전부 돌려드립니다. 타사와 비교 불가한 업계 최고 수준의 지원을 약속합니다.
            </p>
          </div>

          {/* Card 03 */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl border border-slate-100 hover:border-[#0A685D]/30 group">
            <div className="w-14 h-14 rounded-2xl bg-[#0A685D]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A685D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
              03. 베테랑 전문 상담
            </h3>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              인터넷, TV, 휴대폰부터 가전 렌탈까지! 오랜 경력의 분야별 전문가가 다각도로 분석하여 최적의 솔루션을 제시해 드립니다.
            </p>
          </div>

          {/* Card 04 */}
          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all duration-300 flex flex-col shadow-sm hover:shadow-xl border border-slate-100 hover:border-[#0A685D]/30 group">
            <div className="w-14 h-14 rounded-2xl bg-[#0A685D]/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0A685D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">
              04. 설치 당일 입금 원칙
            </h3>
            <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
              설치 완료 확인 후 약속드린 지원금을 정확하고 신속하게 지급해 드리는 것을 원칙으로 삼고 있습니다.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CompanyIntro;