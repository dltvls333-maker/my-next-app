"use client"; 
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Trash2, Camera, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';

const maskName = (name: string) => {
  if (!name || name.length <= 1) return name;
  return name.charAt(0) + '*'.repeat(name.length - 1);
};

const isNewPost = (dateString: string) => {
  if (!dateString) return false;
  const normalizedDate = dateString.replace(/\./g, '-').replace(/\s+/g, '').replace(/-$/, '');
  const reviewDate = new Date(normalizedDate).getTime();
  if (isNaN(reviewDate)) return false;
  const now = new Date().getTime();
  const diffHours = (now - reviewDate) / (1000 * 60 * 60);
  return diffHours <= 24;
};

const hasImage = (url: any) => {
  if (!url) return false;
  if (typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return trimmed !== '' && trimmed !== 'null' && trimmed !== 'undefined' && trimmed !== 'none';
};

const getStarRating = (id: number) => {
  return 5; 
};

export default function ReviewClient({ initialReviews }: { initialReviews: any[] }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.level === 9;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const ITEMS_PER_PAGE = 9;

  const filteredReviews = initialReviews.filter((review) => {
    const matchesCategory = category === '전체' || review.category === category;
    const matchesSearch = review.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);

  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === currentReviews.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentReviews.map(r => r.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDeleteSelected = async () => {
    if (!confirm(`${selectedIds.length}개의 후기를 삭제하시겠습니까?`)) return;
    try {
      await Promise.all(selectedIds.map(id => 
        fetch(`/api/reviews/${id}`, { method: 'DELETE' })
      ));
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      alert("삭제 실패");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 mb-10">
      {/* 헤더 섹션: Grid 레이아웃으로 변경하여 텍스트와 워터마크를 완벽하게 중앙 정렬 */}
      <div className="border-b border-slate-100 mb-8 md:mb-10 bg-white relative overflow-hidden">
        {/* 핵심 수정: mx-auto w-full max-w-[1100px] 컨테이너 안에 grid 배치 */}
        <div className="mx-auto w-full max-w-[1100px] py-12 md:py-16 px-4 grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-8 relative">
          
          {/* 왼쪽 영역 (빈 공간) */}
          <div></div>

          {/* 중앙 영역: 텍스트 콘텐츠 */}
          <div className="text-center md:text-left relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 tracking-tight">고객 후기</h1>
            <p className="text-slate-600 mt-3 md:mt-4 text-xs md:text-sm font-medium leading-relaxed">
              이음통신을 이용하신 고객님들의 실제 목소리입니다. <br />
              소중한 경험을 나누어 주셔서 감사합니다.
            </p>
          </div>
          
          {/* 오른쪽 영역 (빈 공간) */}
          <div></div>

          {/* 배경 워터마크 (Grid 중앙 셀에 맞춰 배치됨) */}
          <span className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 text-[120px] font-black text-slate-100/60 pointer-events-none select-none leading-none self-center z-0">
            REVIEW
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1100px] px-4">
        
        {/* 상단 필터 및 검색바 영역 */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none w-full md:w-auto justify-start">
            {['전체', '인터넷', 'TV', '휴대폰', '렌탈'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`cursor-pointer text-xs md:text-sm font-bold px-4 py-2 rounded-full transition-all flex-shrink-0 ${category === cat ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex gap-3 items-center w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="제목으로 검색하세요" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-slate-100 border border-slate-200 rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-slate-950 focus:border-slate-950 outline-none transition-all" 
              />
              <Search className="absolute right-3.5 top-2.5 text-slate-400" size={18} />
            </div>
            <Link href="/reviews/write" className="bg-slate-950 text-white px-6 py-2.5 text-sm font-bold hover:bg-slate-800 transition text-center rounded-full flex-shrink-0">
              글쓰기
            </Link>
          </div>
        </div>

        {isAdmin && selectedIds.length > 0 && (
          <div className="mb-4 flex justify-end">
            <button onClick={handleDeleteSelected} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 text-sm">
              <Trash2 size={16} /> 선택 삭제 ({selectedIds.length})
            </button>
          </div>
        )}

        {/* 앨범형 그리드 뷰 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-shadow duration-300 relative group">
              {isAdmin && (
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.includes(review.id)} 
                    onChange={() => toggleSelect(review.id)}
                    className="w-5 h-5 accent-slate-950 rounded cursor-pointer"
                  />
                </div>
              )}

              <Link href={`/reviews/${review.id}`} className="block aspect-[4/3] overflow-hidden rounded-xl relative bg-slate-100">
                {hasImage(review.image_url) ? (
                  <img 
                    src={review.image_url} 
                    alt={review.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Camera size={40} strokeWidth={1.5} />
                  </div>
                )}
                <span className="absolute top-3 left-3 font-bold text-[10px] tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full uppercase shadow-inner">
                  {review.category}
                </span>
                {isNewPost(review.date) && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                    N
                  </span>
                )}
              </Link>

              <div className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <Link href={`/reviews/${review.id}`} className="hover:underline">
                    <h3 className="font-bold text-slate-950 text-base line-clamp-2 leading-snug">
                      {review.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(getStarRating(review.id))].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-slate-600 border-t border-slate-100 pt-4">
                  <span className="font-medium">{maskName(review.user_name)}</span>
                  <span className="text-slate-400 text-xs">{review.date}</span>
                </div>
                {isAdmin && review.ip_address && (
                    <div className="text-xs text-slate-400 font-mono bg-slate-50 p-1 rounded text-center">
                        IP: {review.ip_address}
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 영역 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 mb-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-full hover:bg-slate-200 text-slate-600 disabled:opacity-30 transition-colors bg-slate-100"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-full text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-lg scale-105'
                      : 'text-slate-600 hover:bg-slate-200 hover:text-slate-950 bg-slate-100'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-full hover:bg-slate-200 text-slate-600 disabled:opacity-30 transition-colors bg-slate-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}