import React from 'react';

const CompanyIntro = () => {
  const imageUrls = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2480", 
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2480", 
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2480",
  ];

  return (
    <div className="apple-features-section_apple_card">
      {/* 상단 타이틀 영역 */}
      <div className="apple-section-header_apple_card">
        <span className="apple-badge_apple_card">디코비즈는 다릅니다!</span>
        <h2 className="apple-title_apple_card">혜택은 더하고, 부담은 덜었습니다.</h2>
      </div>

      {/* 4개 카드 그리드 영역 */}
      <div className="apple-card-grid_apple_card">
        {/* Card 01 */}
        <div className="apple-card_apple_card">
          <div className="apple-card-icon_apple_card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <div className="apple-card-content_apple_card">
            <h3>01. 최적의 요금 설계!</h3>
            <p>불필요한 고가 요금제 권유 없이 고객님께 꼭 필요한 맞춤 설계는 물론, 놓치기 쉬운 결합 할인까지 꼼꼼하게 챙겨드립니다.</p>
          </div>
        </div>

        {/* Card 02 */}
        <div className="apple-card_apple_card">
          <div className="apple-card-icon_apple_card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="apple-card-content_apple_card">
            <h3>02. 최대 혜택 보장</h3>
            <p>광고비와 유통 수수료를 줄여 고객님께 전부 돌려드립니다. 타사와 비교 불가한 업계 최고 수준의 지원을 약속합니다.</p>
          </div>
        </div>

        {/* Card 03 */}
        <div className="apple-card_apple_card">
          <div className="apple-card-icon_apple_card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div className="apple-card-content_apple_card">
            <h3>03. 베테랑 전문 상담</h3>
            <p>인터넷, TV, 휴대폰부터 가전 렌탈까지! 오랜 경력의 분야별 전문가가 고객님의 상황을 다각도로 분석하여 가장 유리한 최적의 솔루션을 제시해 드립니다.</p>
          </div>
        </div>

        {/* Card 04 */}
        <div className="apple-card_apple_card">
          <div className="apple-card-icon_apple_card">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0066CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="apple-card-content_apple_card">
            <h3>04. 설치 당일 입금 원칙</h3>
            <p>설치 완료 확인 후 약속드린 지원금을 정확하고 신속하게 지급해 드리는 것을 원칙으로 삼고 있습니다.</p>
          </div>
        </div>
      </div>

      {/* 하단 디자인 요소 */}
      <div className="apple-gift-decoration_apple_card z-99">
        <div className="gift-box-icon_apple_card z-99">🎁</div>
      </div>
    </div>
    // <section className="w-full py-16 md:py-24 bg-white">
    //   {/* 여기서 max-w-[1240px]를 적용하여 폭을 고정합니다 */}
    //   <div className="max-w-[1240px] mx-auto px-4 md:px-8">
    //     <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center py-12">
    //       <span className="t-green">일일넷</span>은 다릅니다.
    //     </h2>

    //     <div className="w-full flex flex-col gap-6 md:gap-10">
    //       {imageUrls.map((url, index) => (
    //         <div 
    //           key={index} 
    //           className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-lg"
    //         >
    //           <img 
    //             src={url} 
    //             alt={`회사 특징 이미지 ${index + 1}`} 
    //             className="w-full h-full object-cover"
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </section>
  );
};

export default CompanyIntro;