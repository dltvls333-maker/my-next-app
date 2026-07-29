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
  <div className="flex text-yellow-400 text-base">
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
    <div className="w-full py-16 bg-slate-50 overflow-hidden">
      <h2 className="text-3xl text-center py-12 md:text-4xl font-extrabold text-slate-900 tracking-tight">
        <span className="t-green">실제</span> 고객 후기
      </h2>
      
      {/* 롤링 애니메이션 영역 (하드웨어 가속 최적화) */}
      <div className="flex w-full overflow-hidden py-4">
        <motion.div 
          className="flex gap-8 will-change-transform"
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
                className="w-[480px] bg-white rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] overflow-hidden border border-slate-100 cursor-pointer transition-shadow duration-300 hover:shadow-xl flex flex-col"
              >
                {/* 상단: 원래 비율을 살린 가로로 긴 배너 이미지 영역 */}
                {review.image_url && (
                  <div className="w-full aspect-[21/9] bg-slate-900 overflow-hidden relative">
                    <img 
                      src={review.image_url} 
                      className="w-full h-full object-cover" 
                      alt="후기 이미지" 
                    />
                  </div>
                )}
                
                {/* 하단: 텍스트 영역 */}
                <div className="p-6 flex flex-col gap-2.5 flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <StarRating />
                      <span className="text-xs text-slate-400 font-medium">{review.date}</span>
                    </div>
                    
                    <h3 className="font-bold text-lg text-slate-900 truncate mb-1" title={review.title}>
                      {review.title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-sm">
                    <span className="font-extrabold text-indigo-600">{maskName(review.user_name)} 고객님</span>
                    <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2.5 py-1 rounded-full">상세보기 &rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}