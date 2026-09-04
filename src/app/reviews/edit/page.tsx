'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense, DragEvent, ChangeEvent } from 'react';
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

  // 💡 기존에 서버에 등록되어 있는 이미지 URL/경로를 관리하는 상태
  const [existingImages, setExistingImages] = useState<string[]>([]);
  // 💡 새로 업로드할 원본 File 객체 배열 상태 (WRITE 페이지 방식)
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
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

        // 💡 서버에서 받아온 기존 이미지 설정 (배열 형태 또는 단일 문자열인 경우 처리)
        if (data.image_url) {
          const images = Array.isArray(data.image_url) 
            ? data.image_url 
            : data.image_url.includes(',') 
              ? data.image_url.split(',').map((s: string) => s.trim()) 
              : [data.image_url];
          setExistingImages(images);
        }
      } catch (err) {
        console.error("데이터 로드 중 에러 발생:", err);
        alert("데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, [id]);

  // 💡 WRITE 페이지와 동일한 파일 핸들링 로직
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    setFileList((prev) => [...prev, ...imageFiles]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 💡 FormData를 사용하여 텍스트 데이터와 새 이미지 파일들을 함께 전송
    const data = new FormData();
    data.append('category', selectedCategory);
    data.append('user_name', formData.user_name);
    data.append('phone_last', formData.phone_last);
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.password) {
      data.append('password', formData.password);
    }
    
    // 새로 첨부한 파일들이 있다면 append
    fileList.forEach((file) => {
      data.append('images[]', file);
    });

    console.log("수정 전송 데이터 포함 완료");

    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        // 💡 FormData 전송 시 Content-Type 헤더를 수동으로 지정하면 안 됩니다 (브라우저가 boundary 자동 설정)
        body: data,
      });

      const result = await res.json();
      
      if (res.ok) {
        alert('수정이 완료되었습니다.');
        router.push(`/reviews/${id}`);
      } else {
        alert('수정 실패: ' + (result.error || '알 수 없는 오류'));
      }
    } catch (err) {
      console.error(err);
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 border-b border-slate-200 pb-8">
            <label className={labelClass}>카테고리</label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSelectedCategory(item)}
                  className={`px-5 sm:px-6 py-2 rounded-full border transition-all duration-200 font-medium text-sm sm:text-base ${
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

          {/* 제목 */}
          <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
            <label className={labelClass}>제목</label>
            <input name="title" type="text" className={inputClass}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>

          {/* 내용 */}
          <div className="flex gap-8 border-b border-slate-200 pb-8">
            <label className={`${labelClass} pt-4`}>후기 내용</label>
            <textarea name="content" className="flex-1 h-64 p-4 border border-slate-300 rounded-lg text-slate-900 font-medium outline-none focus:border-indigo-600 resize-none transition"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
          </div>

          {/* 💡 사진 첨부 및 기존 이미지 미리보기 영역 */}
          <div className="flex gap-8 border-b border-slate-200 pb-8">
            <label className={`${labelClass} pt-4`}>사진 첨부</label>
            <div className="flex-1">
              {/* 기존에 업로드된 이미지가 있는 경우 표시 */}
              {existingImages.length > 0 && fileList.length === 0 && (
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-500 mb-2">기존 등록된 이미지</p>
                  <div className="space-y-2">
                    {existingImages.map((imgUrl, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center">
                          <img src={imgUrl} alt={`기존 이미지 ${i + 1}`} className="w-16 h-16 object-cover mr-3 rounded" />
                          <span className="text-sm font-medium text-slate-600 truncate">기존 업로드 이미지 {i + 1}</span>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setExistingImages([])}
                          className="text-xs text-red-500 hover:underline px-2 py-1 cursor-pointer"
                        >
                          제거 후 새로 등록
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* WRITE 페이지와 동일한 드래그 앤 드롭 업로드 UI */}
              <label className="cursor-pointer group block"
                onDragOver={(e: DragEvent<HTMLLabelElement>) => { e.preventDefault(); e.currentTarget.querySelector('div')?.classList.add('border-indigo-600', 'bg-indigo-50'); }}
                onDragLeave={(e: DragEvent<HTMLLabelElement>) => { e.preventDefault(); e.currentTarget.querySelector('div')?.classList.remove('border-indigo-600', 'bg-indigo-50'); }}
                onDrop={(e: DragEvent<HTMLLabelElement>) => {
                  e.preventDefault();
                  e.currentTarget.querySelector('div')?.classList.remove('border-indigo-600', 'bg-indigo-50');
                  handleFiles(e.dataTransfer.files);
                }}
              >
                <div className="w-full h-32 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center rounded-lg group-hover:border-slate-900 transition-all">
                  <span className="text-slate-500 font-bold group-hover:text-slate-900">클릭하거나 파일을 드래그하세요</span>
                  <span className="text-xs text-slate-400 mt-1">새로운 이미지로 변경하려면 파일을 첨부하세요.</span>
                </div>
                <input type="file" multiple accept="image/*" className="hidden" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)} />
              </label>

              {/* 새로 선택한 파일 미리보기 목록 */}
              {fileList.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-indigo-600 mb-2">새로 첨부할 이미지</p>
                  {fileList.map((file, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-indigo-50/50 rounded-lg border border-indigo-100">
                      <div className="flex items-center">
                        <img src={URL.createObjectURL(file)} alt={`새 미리보기 ${i + 1}`} className="w-16 h-16 object-cover mr-3 rounded" />
                        <span className="text-sm font-medium truncate">{file.name}</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => setFileList(fileList.filter((_, index) => index !== i))}
                        className="text-xs text-red-500 hover:underline px-2 py-1 cursor-pointer"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 작성자 & 전화번호 & 비밀번호 */}
          <div className="grid md:grid-cols-3 gap-8">
             <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
               <label className={labelClass}>작성자</label>
               <input name="user_name" type="text" className={inputClass} 
                  value={formData.user_name}
                  onChange={(e) => setFormData({...formData, user_name: e.target.value})} required />
             </div>
             <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
               <label className={labelClass}>전화번호 뒷자리</label>
               <input name="phone_last" type="text" maxLength={4} className={inputClass} 
                  value={formData.phone_last}
                  onChange={(e) => setFormData({...formData, phone_last: e.target.value})} required />
             </div>
             <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
               <label className={labelClass}>비밀번호</label>
               <input name="password" type="password" placeholder="수정/삭제용 비밀번호 (관리자 생략 가능)" className={inputClass} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})} />
             </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="px-12 h-14 bg-slate-900 text-white font-bold hover:bg-slate-700 transition cursor-pointer rounded-lg">
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