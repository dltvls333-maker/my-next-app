'use client';

import React, { useState, DragEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X, UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function ReviewsAdmin({ onSubmit }: { onSubmit: (data: FormData) => void }) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('인터넷');
  const [formData, setFormData] = useState({ user_name: '관리자', title: '', content: '' });
  const [fileList, setFileList] = useState<File[]>([]);

  const handleFiles = (files: FileList | null) => {
    if (files) setFileList((prev) => [...prev, ...Array.from(files)]);
  };

  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append('category', selectedCategory);
    data.append('user_name', formData.user_name);
    data.append('title', formData.title);
    data.append('content', formData.content);
    fileList.forEach((file) => data.append('images[]', file));
    await onSubmit(data);
    alert('후기가 등록 되었습니다.');
    // 작업 후 리다이렉트
     router.push('/admin');
  };

  const categories = ['인터넷', 'TV', '휴대폰', '렌탈'];
  const inputClass = "w-full px-4 py-3 border border-slate-200 bg-white rounded-lg text-slate-900 font-medium outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition";
  const labelClass = "font-bold text-slate-800 w-28 shrink-0 text-sm";

  return (
    <div className="mx-auto max-w-[1240px] bg-white  border-slate-100 ">
      

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 카테고리 */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
          <label className={labelClass}>카테고리</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item} type="button" onClick={() => setSelectedCategory(item)}
                className={`px-5 py-2.5 rounded-full text-sm border cursor-pointer transition ${selectedCategory === item ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-50'}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 작성자 */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
          <label className={labelClass}>작성자</label>
          <input type="text" className={`${inputClass}`} />
        </div>

        {/* 제목 */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
          <label className={labelClass}>제목</label>
          <input name="title" type="text" placeholder="제목을 입력하세요." className={inputClass}
            value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        </div>

        {/* 내용 */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-start">
          <label className={`${labelClass} pt-2`}>후기 내용</label>
          <textarea name="content" placeholder="내용을 입력하세요." className={`${inputClass} h-64 resize-none`}
            value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required />
        </div>

        {/* 사진 */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-start">
          <label className={`${labelClass} pt-2`}>사진 첨부</label>
          <div className="flex-1 w-full">
            <label className="cursor-pointer block">
              <div className="w-full h-32 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center rounded-xl hover:bg-indigo-50">
                <UploadCloud className="w-8 h-8 text-slate-400" />
                <span className="text-sm text-slate-600 mt-2">파일을 드래그하거나 클릭하세요</span>
              </div>
              <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
            </label>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {fileList.map((file, i) => {
                // 1. 파일 객체를 브라우저용 URL로 변환
                const previewUrl = URL.createObjectURL(file);
                
                return (
                <div key={i} className="relative aspect-square bg-slate-100 rounded overflow-hidden border">
                    {/* 2. 아이콘 대신 실제 이미지 렌더링 */}
                    <img 
                    src={previewUrl} 
                    alt="preview" 
                    className="w-full h-full object-cover" 
                    onLoad={() => URL.revokeObjectURL(previewUrl)} // 메모리 누수 방지
                    />
                    
                    <button 
                    type="button" 
                    onClick={() => removeFile(i)} 
                    className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                    >
                    <X size={12} />
                    </button>
                </div>
                );
            })}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-8 ">
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold">등록하기</button>
        </div>
      </form>
    </div>
  );
}