import React from 'react';

const ResponsiveImage = () => {
  return (
    <div className="w-full flex justify-center ">
      {/* 모바일용 이미지 (화면이 md 이상이면 숨김) */}
      <img 
        src="/layout_img/M_1.png" 
        alt="모바일용 서비스 안내" 
        className="block md:hidden w-full max-w-[600px] h-auto" 
      />
      
      {/* PC용 이미지 (화면이 md 미만이면 숨김) */}
      <img 
        src="/layout_img/1.png" 
        alt="PC용 서비스 안내" 
        className="hidden md:block w-full max-w-[1904px] h-auto" 
      />
    </div>
  );
};

export default ResponsiveImage;