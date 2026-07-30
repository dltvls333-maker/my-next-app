'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// 1. useSearchParams를 사용하는 실제 내부 컴포넌트 분리
function ReviewEditContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [selectedCategory, setSelectedCategory] = useState('인터넷');
  const [formData, setFormData] = useState({
    user_name: '',
    phone_last: '',
    password: '',
    title: '',
    content: '',
  });

  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        console.log(id);
        const res = await fetch(`/api/reviews/${id}`, {
          method: 'GET',
          headers: { 'Cache-Control': 'no-cache' },
        });

        if (!res.ok) {
          throw new Error(`서버 응답 에러: ${res.status}`);
        }

        const data = await res.json();
        console.log("받아온 데이터 확인:", data);

        setSelectedCategory(data.category);
        setFormData({
          user_name: data.user_name || '',
          phone_last: data.phone_last || '',
          password: '',
          title: data.title || '',
          content: data.content || '',
        });
      } catch (err) {
        console.error("데이터 로드 중 에러 발생:", err);
        alert("데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      category: selectedCategory,
      user_name: formData.user_name,
      phone_last: formData.phone_last,
      title: formData.title,
      content: formData.content,
    };

    console.log("전송 데이터:", payload);

    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      
      if (res.ok) {
        alert('수정이 완료되었습니다.');
        router.push(`/reviews/${id}`);
      } else {
        alert('수정 실패: ' + result.error);
      }
    } catch (err) {
      alert("서버 연결에 실패했습니다.");
    }
  };

  const categories = ['인터넷', 'TV', '휴대폰', '렌탈'];
  const inputClass = "w-full h-14 px-4 border border-slate-300 rounded-lg text-slate-900 font-medium outline-none focus:border-indigo-600 transition";
  const labelClass = "font-bold text-slate-900 w-32 shrink-0";

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="mx-auto max-w-[1240px]">
        <div className="border-b-2 border-slate-900 pb-8 mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">고객 후기 수정</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 카테고리 */}
          <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
            <label className={labelClass}>카테고리</label>
            <div className="flex gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedCategory(item)}
                  className={`px-6 py-2 rounded-full border transition-all duration-200 font-medium ${
                    selectedCategory === item 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
            <label className={labelClass}>제목</label>
            <input name="title" type="text" className={inputClass}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>

          <div className="flex gap-8 border-b border-slate-200 pb-8">
            <label className={`${labelClass} pt-4`}>후기 내용</label>
            <textarea name="content" className="flex-1 h-64 p-4 border border-slate-300 rounded-lg text-slate-900 font-medium outline-none focus:border-indigo-600 resize-none transition"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
          </div>

          {/* 작성자, 전화번호, 비밀번호 */}
          <div className="grid md:grid-cols-3 gap-8">
             <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
               <label className={labelClass}>작성자</label>
               <input name="user_name" type="text" className={inputClass} value={formData.user_name} onChange={(e) => setFormData({...formData, user_name: e.target.value})} required />
             </div>
             <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
               <label className={labelClass}>전화번호 뒷자리</label>
               <input name="phone_last" type="text" maxLength={4} className={inputClass} value={formData.phone_last} onChange={(e) => setFormData({...formData, phone_last: e.target.value})} required />
             </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="px-12 h-14 bg-slate-900 text-white font-bold hover:bg-slate-700 transition cursor-pointer">
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

// 2. Next.js 빌드 요구사항(Suspense 바운더리)을 만족하는 기본 내보내기 컴포넌트
export default function ReviewEditPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">로딩 중...</div>}>
      <ReviewEditContent />
    </Suspense>
  );
}