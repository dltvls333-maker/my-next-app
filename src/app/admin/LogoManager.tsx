"use client";

import { useState } from 'react';
import { updateLogo } from '../actions';

export default function LogoManager({ initialLogo }: { initialLogo: string }) {
  const [preview, setPreview] = useState(initialLogo);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // 선택한 파일을 즉시 미리보기로 변환
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <form 
      action={async (formData) => {
        await updateLogo(formData);
        alert("로고 이미지가 변경되었습니다!");
      }} 
      className="flex items-center gap-4"
    >
      <img src={preview} alt="로고" className="h-10 w-auto object-contain bg-slate-50 p-2 rounded-lg border border-slate-100" />
      
      <label className="cursor-pointer flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition font-medium text-slate-700">
        <span>📎</span> 파일 선택
        <input type="file" name="image" accept="image/*" className="hidden" onChange={handleFileChange} />
      </label>
      
      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold transition">
        + 변경 사항 저장
      </button>
    </form>
  );
}