'use client';

import { useState } from 'react';
import { updateAdvertiseText } from '../actions';

interface AdvertiseTextManagerProps {
  initialText: string;
}

export default function AdvertiseTextManager({ initialText }: AdvertiseTextManagerProps) {
  const [text, setText] = useState(initialText || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateAdvertiseText(text);
      alert('상단 텍스트가 수정되었습니다.');
    } catch (error) {
      console.error(error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex justify-between items-center mb-12 pb-8 border-b border-slate-100">
      <div>
        <h2 className="text-xl font-bold text-slate-900">상단 텍스트 관리</h2>
        <p className="text-slate-500 text-sm">사이트 최상단 광고 텍스트를 변경합니다.</p>
      </div>

      <div className="flex items-center gap-3">
        <input 
          type="text" 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="상단에 노출될 텍스트를 입력하세요"
          className="w-80 px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button 
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap disabled:opacity-50"
            >
            {loading ? '저장 중...' : '저장'}
            </button>
      </div>
    </form>
  );
}