"use client";

import { useState } from 'react';
import { updateBannerWithFile, deleteBanner } from '../actions'; 

export default function BannerCard({ banner }: { banner: any }) {
  const [isEditing, setIsEditing] = useState(false);
  // 미리보기용 상태 추가
  const [previewUrl, setPreviewUrl] = useState(banner.image_url);

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4 transition hover:border-indigo-200">
      {/* 1. 고정된 상태가 아니라 previewUrl 상태를 바라보게 수정 */}
      <img src={previewUrl} alt="배너" className="w-32 h-20 object-cover rounded-xl bg-slate-200" />
      
      <div className="flex-1 flex flex-col justify-center">
        {isEditing ? (
          <form 
            action={async (formData) => {
              await updateBannerWithFile(banner.id, formData);
              setIsEditing(false);
            }} 
            className="flex flex-col gap-2"
          >
            <input name="title" defaultValue={banner.title} className="p-1 border rounded text-sm w-full" placeholder="제목" />
            <input type="hidden" name="current_image" defaultValue={banner.image_url} />
            
            {/* 2. onChange 추가 */}
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              onChange={handleFileChange}
              className="text-xs p-1 border rounded w-full" 
            />
            
            <div className="flex gap-2 mt-1">
              <button type="submit" className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition">저장</button>
              <button 
                type="button" 
                onClick={() => { setIsEditing(false); setPreviewUrl(banner.image_url); }} // 취소 시 원래 이미지로 복구
                className="text-xs bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="font-bold text-slate-900">{banner.title}</h3>
            <p className="text-sm text-slate-500">{banner.subtitle}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setIsEditing(true)} className="text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 px-3 py-1 rounded-lg transition">수정</button>
              <button onClick={async () => { if(confirm("정말 삭제하시겠습니까?")) await deleteBanner(banner.id); }} className="text-xs font-semibold text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-lg transition">삭제</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}