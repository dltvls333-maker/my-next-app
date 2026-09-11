'use client';

import { useState } from 'react';
import { updateAppliance } from '../actions';

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
  // 각 아이템별 입력 상태 및 선택된 파일 상태 관리
  const [formDataMap, setFormDataMap] = useState<{ 
    [key: number]: { title: string; badge: string; orderNum: number; previewSrc: string; selectedFile: File | null } 
  }>(
    initialAppliances.reduce((acc, item) => {
      acc[item.id] = { 
        title: item.title, 
        badge: item.badge, 
        orderNum: item.orderNum, 
        previewSrc: item.src, 
        selectedFile: null 
      };
      return acc;
    }, {} as any)
  );

  const [loadingId, setLoadingId] = useState<number | null>(null);

  // 텍스트/숫자 입력 핸들러
  const handleChange = (id: number, field: string, value: any) => {
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // 파일 선택 시 미리보기 URL 생성 및 파일 객체 보관 (업로드는 저장 버튼 누를 때 진행)
  const handleFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], previewSrc: previewUrl, selectedFile: file },
    }));
  };

  // 개별 수정 저장 핸들러
  const handleSubmit = async (id: number, e: React.FormEvent) => {
    e.preventDefault();
    setLoadingId(id);

    const current = formDataMap[id];
    const form = new FormData();
    form.append('title', current.title);
    form.append('badge', current.badge);
    form.append('orderNum', String(current.orderNum));
    form.append('existingSrc', initialAppliances.find(item => item.id === id)?.src || '');
    
    if (current.selectedFile) {
      form.append('image', current.selectedFile);
    }

    try {
      await updateAppliance(id, form);
      alert('가전제품 정보와 이미지가 Railway DB 및 Supabase(appliance 버킷)에 안전하게 저장되었습니다.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoadingId(null);
    }
  };

  if (!initialAppliances || initialAppliances.length === 0) {
    return <div className="p-4 text-slate-400 text-sm">등록된 가전제품 데이터가 없습니다.</div>;
  }

  return (
    <div className="mb-12 pb-8 border-b border-slate-100">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">가전제품 정보 수정</h2>
          <p className="text-slate-500 text-sm">등록된 가전제품 텍스트, 이미지 파일, 노출 순서를 수정할 수 있습니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialAppliances.map((item) => {
          const current = formDataMap[item.id] || { title: item.title, badge: item.badge, orderNum: item.orderNum, previewSrc: item.src, selectedFile: null };
          const isLoading = loadingId === item.id;

          return (
            <form 
              key={item.id} 
              onSubmit={(e) => handleSubmit(item.id, e)}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between shadow-sm gap-4"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  아이템 ID #{item.id}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-semibold">노출순서:</span>
                  <input 
                    type="number"
                    value={current.orderNum}
                    onChange={(e) => handleChange(item.id, 'orderNum', Number(e.target.value))}
                    className="w-16 px-2 py-1 border rounded-lg text-xs bg-white text-center font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                {/* 이미지 미리보기 및 파일 선택 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 bg-white border rounded-xl flex items-center justify-center overflow-hidden p-1">
                    <img src={current.previewSrc} alt={current.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    id={`file-${item.id}`} 
                    className="hidden" 
                    onChange={(e) => handleFileChange(item.id, e)} 
                  />
                  <label 
                    htmlFor={`file-${item.id}`} 
                    className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg cursor-pointer transition text-center w-full"
                  >
                    파일 변경
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