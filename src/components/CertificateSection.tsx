import React from 'react';

const CertificateSection = () => {
  const certs = [
    { src: '/cert_img/1.png', alt: '한국소비자평가대상' },
    { src: '/cert_img/2.png', alt: '방문판매업신고증' },
    { src: '/cert_img/3.jpg', alt: '사전승낙서' },
  ];

  return (
    <section className="w-full bg-white py-16 px-4 md:px-10 green_gradient-bg">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* 왼쪽: 서류 이미지 3장 */}
        <div className="w-full md:w-1/2 grid grid-cols-3 gap-3">
          {certs.map((cert, index) => (
            <div key={index} className="bg-slate-50 p-2 rounded-xl border border-slate-200 shadow-sm">
              <img 
                src={cert.src} 
                alt={cert.alt} 
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* 오른쪽: 신뢰 텍스트 */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            이음통신은 <span className="t-green"> 믿고 가입</span> 하셔도 좋습니다.
          </h2>
          <p className="text-lg text-slate-600">
            정식으로 등록된 통신판매 사업자이며, 모든 필수 영업 신고를 완료한 <br /> 안전한 파트너입니다. <br />
            과장 광고나 불투명한 가입 절차 없이, 고객님의 소중한 통신 생활을 <br /> 투명하고 정직하게 지원합니다.
          </p>
          
          <div className="pt-4 flex items-center gap-3">
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-semibold text-sm">
              ✓ 투명한 운영
            </div>
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-semibold text-sm">
              ✓ 100% 안전 보장
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CertificateSection;