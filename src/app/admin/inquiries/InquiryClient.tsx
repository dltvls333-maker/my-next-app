'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

const isNewPost = (dateString: string) => {
  if (!dateString) return false;
  const normalizedDate = dateString.replace(/\./g, '-').replace(/\s+/g, '').replace(/-$/, '');
  const reviewDate = new Date(normalizedDate).getTime();
  
  if (isNaN(reviewDate)) return false;

  const now = new Date().getTime();
  const diffHours = (now - reviewDate) / (1000 * 60 * 60);
  return diffHours <= 24;
};

export default function InquiryClient({ initialInquiries }: { initialInquiries: any[] }) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.level === 9;
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const ITEMS_PER_PAGE = 10;

  // 이름 또는 전화번호로 검색 필터링
  const filteredInquiries = initialInquiries.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search);
    return matchesSearch;
  });
  
  const totalPages = Math.ceil(filteredInquiries.length / ITEMS_PER_PAGE);

  const currentInquiries = filteredInquiries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === currentInquiries.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(currentInquiries.map(item => item.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // 선택 삭제 기능 구현
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`${selectedIds.length}개의 문의 내역을 삭제하시겠습니까?`)) return;

    try {
      const results = await Promise.all(
        selectedIds.map(id => fetch(`/api/consultation/${id}`, { method: 'DELETE' }))
      );

      const failed = results.find(res => !res.ok);
      if (failed) {
        throw new Error('일부 항목 삭제 실패');
      }
      
      alert("삭제되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error('Delete error:', error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="min-h-screen bg-white mb-10 px-4">
      {/* 상단 타이틀 배너 영역 */}
      <div className="bg-slate-50 border-b border-slate-100 mb-10">
        <div className="mx-auto w-full max-w-[1240px] py-16 px-4 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">상담 문의 관리</h1>
            <p className="text-slate-600 mt-4 text-sm font-medium">
              고객님들이 남겨주신 상담 신청 내역입니다. <br />
              빠른 확인 후 응대해 주시기 바랍니다.
            </p>
          </div>
          <div className="hidden md:block opacity-10">
            <span className="text-[100px] font-black">INQUIRY</span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1240px]">
        {/* 검색 및 대시보드로 돌아가기 버튼 영역 */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-700">총 문의 내역: <span className="text-indigo-600">{filteredInquiries.length}건</span></span>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative w-80">
              <input 
                type="text" 
                placeholder="이름 또는 연락처로 검색하세요" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:border-indigo-600 outline-none transition-all" 
              />
              <Search className="absolute right-3 top-3 text-slate-500" size={20} />
            </div>
            <Link href="/admin" className="bg-slate-900 text-white px-6 py-3 text-sm font-bold hover:bg-slate-700 transition cursor-pointer rounded-lg">
              대시보드로
            </Link>
          </div>
        </div>

        {isAdmin && selectedIds.length > 0 && (
          <div className="max-w-[1240px] mx-auto mb-4 flex justify-end">
            <button onClick={handleDeleteSelected} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700 cursor-pointer">
              <Trash2 size={18} /> 선택 삭제 ({selectedIds.length})
            </button>
          </div>
        )}

        {/* 테이블 디자인 */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-center border-slate-200 text-slate-500 text-xs uppercase tracking-widest">
              {isAdmin && <th className="py-4 w-12"><input type="checkbox" onChange={toggleSelectAll} checked={selectedIds.length === currentInquiries.length && currentInquiries.length > 0} /></th>}
              <th className="py-4 font-bold w-20">번호</th>
              <th className="py-4 font-bold w-32">작성자</th>
              <th className="py-4 font-bold text-center px-4">연락처</th>
              <th className="py-4 font-bold text-center w-32">등록일</th>
              {isAdmin && <th className="py-4 font-bold text-center w-32">IP</th>}
            </tr>
          </thead>
          <tbody>
            {currentInquiries.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-slate-400">
                  등록된 문의 내역이 없습니다.
                </td>
              </tr>
            ) : (
              currentInquiries.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50 text-center">
                  {isAdmin && <td className="py-5"><input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => toggleSelect(item.id)} /></td>}
                  <td className="py-5">{filteredInquiries.length - ((currentPage - 1) * ITEMS_PER_PAGE + index)}</td>
                  {/* 마스킹 제거: item.name 그대로 출력 */}
                  <td className="py-5 text-sm font-bold text-slate-800">{item.name}</td>
                  
                  <td className="py-5 text-center px-4 font-medium text-indigo-700">
                    <div className="flex items-center justify-center gap-2">
                      <span>{item.phone}</span>
                      {isNewPost(item.date) && (
                        <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full leading-none">
                          N
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-5 text-sm text-slate-600">{item.date}</td>
                  
                  {isAdmin && (
                    <td className="py-5 text-xs text-slate-400 font-mono">
                      {item.ip_address || '0.0.0.0'}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
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