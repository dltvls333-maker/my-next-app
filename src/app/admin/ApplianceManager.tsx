'use client';

import { useState } from 'react';
import { updateAppliance } from '../actions'; // 본인의 actions 경로에 맞게 수정
import { supabase } from '@/lib/supabase';

interface ApplianceItem {
  id: number;
  title: string;
  badge: string;
  src: string;
  orderNum: number;
}

interface ApplianceManagerProps {
  initialAppliances: ApplianceItem[];
}

export default function ApplianceManager({ initialAppliances }: ApplianceManagerProps) {
  // 각 아이템별 입력 상태 관리 (id를 키로 사용)
  const [formDataMap, setFormDataMap] = useState<{ [key: number]: { title: string; badge: string; src: string } }>(
    initialAppliances.reduce((acc, item) => {
      acc[item.id] = { title: item.title, badge: item.badge, src: item.src };
      return acc;
    }, {} as any)
  );

  const [uploadingId, setUploadingId] = useState<number | null>(null);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  // 텍스트 입력 핸들러
  const handleChange = (id: number, field: string, value: string) => {
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // Supabase 이미지 파일 업로드 핸들러
  const handleImageUpload = async (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingId(id);
      const fileExt = file.name.split('.').pop();
      const fileName = `appliance-${id}-${Date.now()}.${fileExt}`;
      const filePath = `appliances/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images') // 본인의 Supabase 버킷 이름
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      // 업로드된 새 이미지 URL로 상태 업데이트
      handleChange(id, 'src', publicUrlData.publicUrl);
      alert('이미지가 첨부되었습니다. 하단의 [수정 저장] 버튼을 눌러주세요.');
    } catch (error) {
      console.error(error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setUploadingId(null);
    }
  };

  // 개별 수정 저장 핸들러
  const handleSubmit = async (id: number, e: React.FormEvent) => {
    e.preventDefault();
    setLoadingId(id);

    const data = formDataMap[id];
    const form = new FormData();
    form.append('title', data.title);
    form.append('badge', data.badge);
    form.append('src', data.src);

    try {
      await updateAppliance(id, form);
      alert('가전제품 정보가 수정되었습니다.');
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="mb-12 pb-8 border-b border-slate-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">가전제품 정보 수정</h2>
        <p className="text-slate-500 text-sm">등록된 8개의 가전제품 텍스트와 이미지를 수정할 수 있습니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialAppliances.map((item) => {
          const current = formDataMap[item.id] || item;
          const isUploading = uploadingId === item.id;
          const isLoading = loadingId === item.id;

          return (
            <form 
              key={item.id} 
              onSubmit={(e) => handleSubmit(item.id, e)}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm gap-4"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  순번 #{item.orderNum || item.id}
                </span>
                <span className="text-xs text-slate-400">ID: {item.id}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* 이미지 미리보기 및 파일 선택 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-white border rounded-xl flex items-center justify-center overflow-hidden p-1">
                    <img src={current.src} alt={current.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    id={`file-${item.id}`} 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(item.id, e)} 
                  />
                  <label 
                    htmlFor={`file-${item.id}`} 
                    className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition text-center w-full"
                  >
                    {isUploading ? '업로드중...' : '파일 변경'}
                  </label>
                </div>

                {/* 텍스트 입력 영역 (제품명, 뱃지) */}
                <div className="sm:col-span-2 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">제품명 (title)</label>
                    <input 
                      type="text" 
                      value={current.title}
                      onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">뱃지 텍스트 (badge)</label>
                    <input 
                      type="text" 
                      value={current.badge}
                      onChange={(e) => handleChange(item.id, 'badge', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-slate-200">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-xs font-bold transition disabled:opacity-50"
                >
                  {isLoading ? '저장 중...' : '수정 저장'}
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}