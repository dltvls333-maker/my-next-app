"use client";

import { useState } from 'react';
import { updateBannerWithFile, deleteBanner } from '../actions'; 
import { supabase } from '@/lib/supabase';

export default function BannerCard({ banner }: { banner: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
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

  // 모바일 파일 변경 핸들러
  const handleMFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMPreviewUrl(URL.createObjectURL(file));
    }
  };

  // 폼 제출 핸들러 (브라우저에서 직접 Supabase 업로드 후 URL만 서버로 전송)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const pcFile = formData.get('image') as File | null;
      const mobileFile = formData.get('link_url') as File | null;

      let imageUrl = banner.image_url;
      let linkUrl = banner.link_url;

      // 1. PC 이미지가 새로 선택된 경우 Supabase Storage에 직접 업로드
      if (pcFile && pcFile instanceof File && pcFile.size > 0) {
        const fileName = `pc_${banner.id}.png`;
        const { error } = await supabase.storage
          .from('banners')
          .upload(fileName, pcFile, { upsert: true });

        if (error) throw new Error("PC 이미지 업로드 실패: " + error.message);

        const { data } = supabase.storage.from('banners').getPublicUrl(fileName);
        imageUrl = `${data.publicUrl}?t=${Date.now()}`;
      }

      // 2. 모바일 이미지가 새로 선택된 경우 Supabase Storage에 직접 업로드
      if (mobileFile && mobileFile instanceof File && mobileFile.size > 0) {
        const fileName = `mobile_${banner.id}.png`;
        const { error } = await supabase.storage
          .from('banners')
          .upload(fileName, mobileFile, { upsert: true });

        if (error) throw new Error("모바일 이미지 업로드 실패: " + error.message);

        const { data } = supabase.storage.from('banners').getPublicUrl(fileName);
        linkUrl = `${data.publicUrl}?t=${Date.now()}`;
      }

      // 3. 파일은 다 업로드되었으니, URL 주소와 제목만 서버 액션으로 전송하여 DB 갱신
      // 함수명은 기존 유지
      await updateBannerWithFile(banner.id, title, imageUrl, linkUrl);
      
      setIsEditing(false);
      alert('성공적으로 저장되었습니다!');
    } catch (error: any) {
      alert(error.message || '저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4 transition hover:border-indigo-200">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input name="title" defaultValue={banner.title} className="p-1 border rounded text-sm w-full" placeholder="제목" required />
            
            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-semibold text-slate-500">PC 이미지 파일</label>
              <input type="file" name="image" accept="image/*" onChange={handleFileChange} className="text-xs p-1 border rounded w-full bg-white" />
            </div>

            <div className="flex flex-col gap-0.5">
              <label className="text-[10px] font-semibold text-slate-500">모바일 이미지 파일</label>
              <input type="file" name="link_url" accept="image/*" onChange={handleMFileChange} className="text-xs p-1 border rounded w-full bg-white" />
            </div>
            
            <div className="flex gap-2 mt-1">
              <button type="submit" disabled={isSaving} className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition disabled:bg-slate-400">
                {isSaving ? '저장 중...' : '저장'}
              </button>
              <button type="button" onClick={() => { setIsEditing(false); setPreviewUrl(banner.image_url); setMPreviewUrl(banner.link_url || ''); }} className="text-xs bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition">취소</button>
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