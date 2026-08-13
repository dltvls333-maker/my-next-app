"use client";

import { useState } from 'react';
import { updateBannerWithFile, deleteBanner } from '../actions'; 

export default function BannerCard({ banner }: { banner: any }) {
  const [isEditing, setIsEditing] = useState(false);
  
  // PC 및 모바일 미리보기 상태 관리
  const [previewUrl, setPreviewUrl] = useState(banner.image_url);
  const [mPreviewUrl, setMPreviewUrl] = useState(banner.link_url || '');

  // PC 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 모바일 파일 변경 핸들러 (link_url 필드용)
  const handleMFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4 transition hover:border-indigo-200">
      {/* 1. PC 및 모바일 이미지 미리보기 영역 */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-slate-400 mb-0.5">PC</span>
          <img src={previewUrl} alt="PC 배너" className="w-28 h-16 object-cover rounded-lg bg-slate-200 border" />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-bold text-slate-400 mb-0.5">MOBILE</span>
          <img src={mPreviewUrl || "https://placehold.co/112x64?text=No+Image"} alt="모바일 배너" className="w-28 h-16 object-cover rounded-lg bg-slate-200 border" />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center">
        {isEditing ? (
          <form 
            encType="multipart/form-data" 
            action={async (formData) => {
              // 그냥 이렇게 실행하시면 됩니다.
              await updateBannerWithFile(banner.id, formData);
              setIsEditing(false);
            }}
            className="flex flex-col gap-2"
          >
            <input name="title" defaultValue={banner.title} className="p-1 border rounded text-sm w-full" placeholder="제목" />
            
            {/* 기존 이미지 경로 유지용 Hidden fields */}
            <input type="hidden" name="current_image" defaultValue={banner.image_url} />
            <input type="hidden" name="current_link_url" defaultValue={banner.link_url} />
            
            {/* PC 이미지 업로드 */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-semibold text-slate-500">PC 이미지 파일</label>
              <input 
                type="file" 
                name="image" 
                accept="image/*" 
                onChange={handleFileChange}
                className="text-xs p-1 border rounded w-full bg-white" 
              />
            </div>

            {/* 모바일 이미지 업로드 (link_url 컬럼에 M_ 접두사 포함 저장) */}
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-semibold text-slate-500">모바일 이미지 파일 (M_)</label>
              <input 
                type="file" 
                name="link_url" 
                accept="image/*" 
                onChange={handleMFileChange}
                className="text-xs p-1 border rounded w-full bg-white" 
              />
            </div>
            
            <div className="flex gap-2 mt-1">
              <button type="submit" className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition">저장</button>
              <button 
                type="button" 
                onClick={() => { 
                  setIsEditing(false); 
                  setPreviewUrl(banner.image_url); 
                  setMPreviewUrl(banner.link_url || ''); 
                }} 
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