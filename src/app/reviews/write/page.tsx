'use client';

import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ReviewWritePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('인터넷');
  const [formData, setFormData] = useState({
    user_name: '',
    phone_last: '',
    password: '',
    title: '',
    content: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setFiles(fileArray);
      setPreviews(fileArray.map(f => URL.createObjectURL(f)));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 1. Supabase Storage로 이미지 직접 업로드 (크롭 없이 원본 그대로)
      const imageUrls: string[] = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
        
        const { error } = await supabase.storage
          .from('reviews')
          .upload(fileName, file);

        if (error) throw error;
        
        const { data } = supabase.storage.from('reviews').getPublicUrl(fileName);
        imageUrls.push(data.publicUrl);
      }

      // 2. FormData에 텍스트 데이터와 이미지 URL 배열 담기
      const data = new FormData(e.currentTarget as HTMLFormElement);
      data.append('category', selectedCategory);
      data.append('image_urls', JSON.stringify(imageUrls));

      // 3. 서버 API로 전송 (파일 업로드 없이 텍스트만 전송되므로 413 에러 없음)
      const res = await fetch('/api/reviews', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        alert('후기가 등록되었습니다!');
        router.push('/reviews');
      } else {
        alert('등록 실패, 다시 시도해주세요.');
      }
    } catch (err) {
      console.error(err);
      alert('업로드 중 오류가 발생했습니다.');
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
          {/* 카테고리/제목/내용 등 기존 UI 유지 */}
          {/* ... */}
          
          <div className="flex gap-8 border-b border-slate-200 pb-8">
            <label className={`${labelClass} pt-4`}>사진 첨부</label>
            <div className="flex-1">
              <input type="file" multiple accept="image/*" onChange={handleFiles} className="mb-4" />
              <div className="flex gap-2 flex-wrap">
                {previews.map((src, i) => (
                  <img key={i} src={src} className="w-20 h-20 object-cover rounded border" />
                ))}
              </div>
            </div>
          </div>
          
          {/* 기타 입력 필드들... */}
          <button type="submit" className="px-12 h-14 bg-slate-900 text-white font-bold hover:bg-slate-700 transition rounded-lg">
            후기 등록하기
          </button>
        </form>
      </div>
    </main>
  );
}