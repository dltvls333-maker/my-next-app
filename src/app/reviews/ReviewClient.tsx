// 목록 페이지 파일 상단에 추가
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Trash2, Camera } from 'lucide-react';
import { useSession } from 'next-auth/react';

const maskName = (name: string) => {
  if (!name || name.length <= 1) return name;
  return name.charAt(0) + '*'.repeat(name.length - 1);
};

// 24시간 이내 작성 여부 확인 함수
const isNewPost = (dateString: string) => {
  if (!dateString) return false;
  const normalizedDate = dateString.replace(/\./g, '-').replace(/\s+/g, '').replace(/-$/, '');
  const reviewDate = new Date(normalizedDate).getTime();
  
  if (isNaN(reviewDate)) return false;

  const now = new Date().getTime();
  const diffHours = (now - reviewDate) / (1000 * 60 * 60);
  return diffHours <= 24;
};

// 이미지 존재 여부를 엄격하고 안전하게 체크하는 함수
const hasImage = (url: any) => {
  if (!url) return false;
  if (typeof url !== 'string') return false;
  const trimmed = url.trim().toLowerCase();
  return trimmed !== '' && trimmed !== 'null' && trimmed !== 'undefined' && trimmed !== 'none';
};

export default function ReviewClient({ initialReviews }: { initialReviews: any[] }) {
  console.log(
 "DATABASE:",
 process.env.DATABASE_URL
);
  const { data: session } = useSession();
  const isAdmin = session?.user?.level === 9;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const ITEMS_PER_PAGE = 10;

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
    <main className="min-h-screen bg-white mb-10 px-4">
      <div className="bg-slate-50 border-b border-slate-100 mb-8 md:mb-10">
        <div className="mx-auto w-full max-w-[1240px] py-10 md:py-16 px-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">고객 후기</h1>
            <p className="text-slate-600 mt-2 md:mt-4 text-xs md:text-sm font-medium leading-relaxed">
              이음통신을 이용하신 고객님들의 실제 목소리입니다. <br />
              소중한 경험을 나누어 주셔서 감사합니다.
            </p>
          </div>
          <div className="hidden md:block opacity-10">
            <span className="text-[120px] font-black">REVIEW</span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1240px]">
        {/* 상단 필터 및 검색바 영역 */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-end gap-4 md:gap-6 mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {['전체', '인터넷', 'TV', '휴대폰', '렌탈'].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)}
                className={`cursor-pointer text-xs md:text-sm font-bold pb-1 border-b-2 transition-all flex-shrink-0 ${category === cat ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative w-full sm:w-80">
              <input 
                type="text" 
                placeholder="제목으로 검색하세요" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 md:py-3 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:bg-white focus:border-indigo-600 outline-none transition-all" 
              />
              <Search className="absolute right-3 top-3 text-slate-500" size={18} />
            </div>
            <Link href="/reviews/write" className="bg-slate-900 text-white px-6 py-2.5 md:py-3 text-sm font-bold hover:bg-slate-700 transition text-center rounded-lg sm:rounded-none">
              글쓰기
            </Link>
          </div>
        </div>

        {isAdmin && selectedIds.length > 0 && (
          <div className="max-w-[1240px] mx-auto mb-4 flex justify-end">
            <button onClick={handleDeleteSelected} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 text-sm">
              <Trash2 size={16} /> 선택 삭제 ({selectedIds.length})
            </button>
          </div>
        )}

        {/* [PC 전용] 테이블 뷰 */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-center border-slate-200 text-slate-500 text-xs uppercase tracking-widest">
                {isAdmin && <th className="py-4 w-12"><input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === currentReviews.length && currentReviews.length > 0} /></th>}
                <th className="py-4 font-bold w-20">번호</th>
                <th className="py-4 font-bold w-32">카테고리</th>
                <th className="py-4 font-bold text-left px-4">제목</th>
                <th className="py-4 font-bold w-32">작성자</th>
                <th className="py-4 font-bold text-center w-32">등록일</th>
                {isAdmin && <th className="py-4 font-bold text-center w-32">IP</th>}
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review, index) => (
                <tr key={review.id} className="hover:bg-slate-50 text-center border-b border-slate-100">
                  {isAdmin && <td className="py-5"><input type="checkbox" checked={selectedIds.includes(review.id)} onChange={() => toggleSelect(review.id)} /></td>}
                  <td className="py-5 text-slate-500 text-sm">{filteredReviews.length - ((currentPage - 1) * ITEMS_PER_PAGE + index)}</td>
                  <td className="py-5 text-indigo-700 font-bold text-sm">{review.category}</td>
                  
                  <td className="py-5 text-left px-4">
                    <Link href={`/reviews/${review.id}`} className="hover:underline flex items-center gap-2">
                      <span className="truncate max-w-[450px] font-medium text-slate-900">{review.title}</span>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {hasImage(review.image_url) && (
                          <span className="text-slate-400" title="사진 첨부됨">
                            <Camera size={16} />
                          </span>
                        )}
                        {isNewPost(review.date) && (
                          <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                            N
                          </span>
                        )}
                      </div>
                    </Link>
                  </td>

                  <td className="py-5 text-sm text-slate-600">{maskName(review.user_name)}</td>
                  <td className="py-5 text-sm text-slate-500">{review.date}</td>
                  
                  {isAdmin && (
                    <td className="py-5 text-xs text-slate-400 font-mono">
                      {review.ip_address || '0.0.0.0'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* [모바일 전용] 카드형 리스트 뷰 (지저분함 완벽 해결) */}
        <div className="block md:hidden space-y-3">
          {currentReviews.map((review, index) => {
            const postNumber = filteredReviews.length - ((currentPage - 1) * ITEMS_PER_PAGE + index);
            
            return (
              <div key={review.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col gap-2.5 relative shadow-sm">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(review.id)} 
                        onChange={() => toggleSelect(review.id)} 
                      />
                    )}
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {review.category}
                    </span>
                    <span className="text-slate-400">No.{postNumber}</span>
                  </div>
                  <span className="text-slate-500">{review.date}</span>
                </div>

                <Link href={`/reviews/${review.id}`} className="block">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-1 flex-1">
                      {review.title}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {hasImage(review.image_url) && <Camera size={15} className="text-slate-400" />}
                      {isNewPost(review.date) && (
                        <span className="bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full">
                          N
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs text-slate-500">
                  <span>작성자: <strong className="text-slate-700">{maskName(review.user_name)}</strong></span>
                  {isAdmin && <span className="font-mono text-[11px] text-slate-400">{review.ip_address || '0.0.0.0'}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* 페이지네이션 영역 */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActive = currentPage === page;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-600 disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}