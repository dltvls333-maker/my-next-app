import React from 'react';

const CertificateSection = () => {
  const certs = [
    { src: '/cert_img/1.png', alt: '한국소비자평가대상' },
    { src: '/cert_img/2.png', alt: '방문판매업신고증' },
    { src: '/cert_img/3.jpg', alt: '사전승낙서' },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-3xl p-6 md:p-12 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-10 md:gap-16">
          
          {/* 왼쪽: 서류 이미지 3장 */}
          <div className="w-full md:w-1/2 grid grid-cols-3 gap-3 md:gap-4">
            {certs.map((cert, index) => (
              <div 
                key={index} 
                className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center group"
              >
                <img 
                  src={cert.src} 
                  alt={cert.alt} 
                  className="w-full h-auto object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* 오른쪽: 신뢰 텍스트 영역 */}
          <div className="w-full md:w-1/2 space-y-5">
            <span className="inline-block bg-[#0A685D]/10 text-[#0A685D] text-xs md:text-sm font-bold px-4 py-1.5 rounded-full tracking-wide">
              TRUSTED PARTNER
            </span>
            
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              바로넷은 <span className="text-[#0A685D]">믿고 가입</span>하셔도 좋습니다.
            </h2>
            
            <p className="text-sm md:text-base text-slate-500 leading-relaxed">
              정식으로 등록된 통신판매 사업자이며, 모든 필수 영업 신고를 완료한 안전한 파트너입니다. 과장 광고나 불투명한 가입 절차 없이, 고객님의 소중한 통신 생활을 투명하고 정직하게 지원합니다.
            </p>
            
            {/* 하단 신뢰 뱃지 (딥 그린 톤으로 일체감 부여) */}
            <div className="pt-2 flex items-center gap-3">
              <div className="px-4 py-2 bg-[#0A685D]/10 text-[#0A685D] rounded-full font-bold text-xs md:text-sm">
                ✓ 투명한 운영
              </div>
              <div className="px-4 py-2 bg-[#0A685D]/10 text-[#0A685D] rounded-full font-bold text-xs md:text-sm">
                ✓ 100% 안전 보장
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CertificateSection;