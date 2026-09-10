'use client';

import { useState } from 'react';

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
      const response = await fetch('/api/admin/advertise-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        alert('상단 텍스트가 수정되었습니다.');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('오류가 발생했습니다.');
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

      {/* 인풋창과 저장 버튼 영역 */}
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
          className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap disabled:opacity-50"
        >
          {loading ? '저장 중...' : '저장'}
        </button>
      </div>
    </form>
  );
}