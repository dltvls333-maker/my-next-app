'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// 1. 이름 마스킹 함수
const maskName = (name: string) => {
  if (!name || name.length < 2) return name;
  return name.substring(0, 1) + '**';
};

// 2. 별점 컴포넌트
const StarRating = () => (
  <div className="flex text-yellow-400 text-xs md:text-base">
    {'★'.repeat(5)}
  </div>
);

export default function ReviewSlider({ reviews }: { reviews: any[] }) {
  // 데이터가 없을 경우 방어 코드
  if (!reviews || reviews.length === 0) return <div className="text-center py-10">후기가 없습니다.</div>;

  // 무한 롤링을 위해 데이터를 2배로 복제
  const duplicatedReviews = [...reviews, ...reviews];
  
  // 데이터 개수에 비례하여 애니메이션 속도 결정 (개당 4초)
  const duration = reviews.length * 4;

  return (
    <div className="w-full py-12 md:py-16 bg-slate-50">
      <h2 className="text-2xl text-center py-8 md:text-4xl font-extrabold text-slate-900 tracking-tight">
        <span className="t-green">바로넷</span> 인터넷 가입 후기
      </h2>
      
      {/* PC 레이아웃 기준(1240px) 및 overflow-hidden 적용 영역 */}
      <div className="max-w-[1200px] mx-auto px-4 overflow-hidden">
        <div className="flex w-full py-4">
          <motion.div 
            className="flex gap-4 md:gap-6 will-change-transform"
            animate={{ x: ["0%", "-50%"] }} 
            transition={{ 
              duration: duration, 
              ease: "linear", 
              repeat: Infinity 
            }}
            style={{ backfaceVisibility: 'hidden', WebkitFontSmoothing: 'antialiased' }}
          >
            {duplicatedReviews.map((review, i) => (
              <Link 
                key={`${review.id}-${i}`}
                href={`/reviews/${review.id}`}
                className="block flex-shrink-0"
              >
                <div 
                  className="w-[280px] md:w-[380px] bg-white rounded-2xl md:rounded-[28px] p-4 md:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-row items-center gap-4 md:gap-5 hover:shadow-lg transition h-full"
                >
                  {/* 좌측: 이미지가 찌그러짐 없이 꽉 차도록 수정된 영역 */}
                  {review.image_url && (
                    <div className="w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex-shrink-0 rounded-xl md:rounded-2xl overflow-hidden relative bg-slate-100">
                      <img 
                        src={review.image_url} 
                        className="w-full h-full object-cover" 
                        alt="후기 이미지" 
                      />
                    </div>
                  )}
                  
                  {/* 우측: 텍스트 영역 */}
                  <div className="flex flex-col justify-center flex-1 min-w-0 text-left">
                    <div className="flex items-center gap-1 mb-1">
                      <StarRating />
                    </div>
                    <span className="text-[11px] md:text-xs text-slate-500 font-medium mb-1">
                      {maskName(review.user_name)} 고객님
                    </span>
                    <h3 className="font-bold text-xs md:text-base text-slate-900 truncate" title={review.title}>
                      {review.title || "제목 텍스트"}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}