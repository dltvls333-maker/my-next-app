'use client';

import React, { useState, DragEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function ReviewWritePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('인터넷');
  const [formData, setFormData] = useState({
    user_name: '',
    phone_last: '',
    password: '',
    title: '',
    content: `1. 가입하신 고객님 성함
(Ex. 홍길*)



2. 가입하신 고객님 핸드폰 뒤에 4자리
(Ex. 0123)



3. 가입하신 상품
(Ex. SK브로드밴드 인터넷 / TV)



4. 가입 후기



`,
  });

  // 💡 원본 File 객체 배열로 상태 관리
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const imageFiles = fileArray.filter(file => file.type.startsWith('image/'));
    setFileList((prev) => [...prev, ...imageFiles]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('category', selectedCategory);
    data.append('user_name', formData.user_name);
    data.append('phone_last', formData.phone_last);
    data.append('password', formData.password);
    data.append('title', formData.title);
    data.append('content', formData.content);
    
    // 💡 원본 파일 객체들을 FormData에 append하여 route.ts로 전송
    fileList.forEach((file) => {
      data.append('images[]', file);
    });

    const res = await fetch('/api/reviews', {
      method: 'POST',
      body: data,
    });

    if (res.ok) {
      alert('소중한 후기를 남겨주셔서 감사합니다!');
      router.push('/reviews');
    } else {
      const errorResult = await res.json();
      console.error('서버 등록 실패:', errorResult);
      alert(errorResult.error || '등록 실패, 다시 시도해주세요.');
    }
  };

  const categories = ['인터넷', 'TV', '휴대폰', '렌탈'];
  const inputClass = "w-full h-14 px-4 border border-slate-300 rounded-lg text-slate-900 font-medium outline-none focus:border-indigo-600 transition";
  const labelClass = "font-bold text-slate-900 w-32 shrink-0";

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="mx-auto max-w-[1240px]">
        <div className="border-b-2 border-slate-900 pb-8 mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">고객 후기 작성</h1>
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
            <input name="title" type="text" placeholder="제목을 입력하세요." className={inputClass}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
          </div>

          {/* 내용 */}
          <div className="flex gap-8 border-b border-slate-200 pb-8">
            <label className={`${labelClass} pt-4`}>후기 내용</label>
            <textarea name="content" placeholder="서비스를 이용하면서 좋았던 점을 작성해주세요."
              className="flex-1 h-64 p-4 border border-slate-300 rounded-lg text-slate-900 font-medium outline-none focus:border-indigo-600 resize-none transition"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
          </div>

          {/* 사진 첨부 (크롭 제거, 원본 미리보기) */}
          <div className="flex gap-8 border-b border-slate-200 pb-8">
            <label className={`${labelClass} pt-4`}>사진 첨부</label>
            <div className="flex-1">
              <label className="cursor-pointer group"
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
                </div>
                <input type="file" multiple accept="image/*" className="hidden" onChange={(e: ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files)} />
              </label>

              {fileList.length > 0 && (
                <div className="mt-4 space-y-2">
                  {fileList.map((file, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center">
                        <img src={URL.createObjectURL(file)} alt={`미리보기 ${i + 1}`} className="w-16 h-16 object-cover mr-3 rounded" />
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
               <input name="user_name" type="text" placeholder="이름" className={inputClass} 
                  value={formData.user_name}
                  onChange={(e) => setFormData({...formData, user_name: e.target.value})} required />
            </div>
            <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
               <label className={labelClass}>전화번호 뒷자리</label>
               <input name="phone_last" type="text" placeholder="예: 1234" maxLength={4} className={inputClass} 
                  value={formData.phone_last}
                  onChange={(e) => setFormData({...formData, phone_last: e.target.value})} required />
            </div>
            <div className="flex items-center gap-8 border-b border-slate-200 pb-8">
               <label className={labelClass}>비밀번호</label>
               <input name="password" type="password" placeholder="수정/삭제용" className={inputClass} 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})} required />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" className="px-12 h-14 bg-slate-900 text-white font-bold hover:bg-slate-700 transition cursor-pointer rounded-lg">
              후기 등록하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}