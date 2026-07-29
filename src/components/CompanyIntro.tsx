import React from 'react';

const CompanyIntro = () => {
  const imageUrls = [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2480", 
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2480", 
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2480",
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-white">
      {/* 여기서 max-w-[1240px]를 적용하여 폭을 고정합니다 */}
      <div className="max-w-[1240px] mx-auto px-4 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center py-12">
          <span className="t-green">일일넷</span>은 다릅니다.
        </h2>

        <div className="w-full flex flex-col gap-6 md:gap-10">
          {imageUrls.map((url, index) => (
            <div 
              key={index} 
              className="w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={url} 
                alt={`회사 특징 이미지 ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;