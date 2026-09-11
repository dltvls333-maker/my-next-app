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
  // 8개 전체 데이터를 하나의 상태로 관리
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

  const [loading, setLoading] = useState(false);

  // 텍스트/숫자 입력 핸들러
  const handleChange = (id: number, field: string, value: any) => {
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  // 파일 선택 시 미리보기 및 파일 객체 보관
  const handleFileChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setFormDataMap((prev) => ({
      ...prev,
      [id]: { ...prev[id], previewSrc: previewUrl, selectedFile: file },
    }));
  };

  // 💡 8개 전체 일괄 저장 핸들러
  const handleBatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 8개의 아이템을 각각 순회하며 서버 액션 호출
      for (const item of initialAppliances) {
        const current = formDataMap[item.id];
        const form = new FormData();
        form.append('title', current.title);
        form.append('badge', current.badge);
        form.append('orderNum', String(current.orderNum));
        form.append('existingSrc', item.src);
        
        if (current.selectedFile) {
          form.append('image', current.selectedFile);
        }

        await updateAppliance(item.id, form);
      }

      alert('8개의 가전제품 정보가 모두 Railway DB와 Supabase에 안전하게 저장되었습니다!');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (!initialAppliances || initialAppliances.length === 0) {
    return <div className="p-4 text-slate-400 text-sm">등록된 가전제품 데이터가 없습니다.</div>;
  }

  return (
    <form onSubmit={handleBatchSubmit} className="mb-12 pb-8 border-b border-slate-100">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">가전제품 정보 일괄 수정</h2>
          <p className="text-slate-500 text-sm">모든 항목을 자유롭게 수정하신 후 맨 아래 저장 버튼을 눌러주세요.</p>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition disabled:opacity-50 shadow-md"
        >
          {loading ? '일괄 저장 중...' : '💾 전체 가전제품 수정 저장'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initialAppliances.map((item) => {
          const current = formDataMap[item.id];

          return (
            <div 
              key={item.id} 
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
            </div>
          );
        })}
      </div>

      {/* 하단 일괄 저장 버튼 추가 */}
      <div className="mt-8 flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl text-sm font-bold transition disabled:opacity-50 shadow-lg"
        >
          {loading ? '일괄 저장 중...' : '💾 전체 가전제품 수정 저장'}
        </button>
      </div>
    </form>
  );
}