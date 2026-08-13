'use client';

import { useState } from 'react';

export default function ConsultationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(value)) {
      setTimeout(() => alert('연락처는 숫자만 입력 가능합니다.'), 0);
      value = value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
    }
    const numbers = value.replace(/[^0-9]/g, '');
    let formattedValue = numbers;
    if (numbers.length > 3 && numbers.length <= 7) {
      formattedValue = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length > 7) {
      formattedValue = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
    setPhone(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('성함을 입력해주세요.');
      return;
    }
    if (phone.length < 12) {
      alert('올바른 연락처를 입력해주세요.');
      return;
    }
    if (!agreed) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('상담 신청이 정상적으로 완료되었습니다.');
        setIsModalOpen(false);
        setName('');
        setPhone('');
        setAgreed(true);
      } else {
        alert(result.message || '신청 중 오류가 발생했습니다.');
      }
    } catch (error) {
      alert('서버 통신 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none px-4">
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="pointer-events-auto bg-[#E7710F] text-white px-8 py-4 rounded-full shadow-lg font-bold text-[17px] hover:bg-[#d0640d] transition transform hover:scale-105"
        >
          비밀지원금 안내 받기
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl relative 
                        transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] 
                        translate-y-0 sm:scale-100 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-10">
            
            <div className="relative flex items-center justify-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 cursor-pointer">비밀지원금 확인하기</h2>
                <button 
                    onClick={() => setIsModalOpen(false)} 
                    className="absolute right-0 text-slate-400 hover:text-slate-600 transition"
                >✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">성함</label>
                <input 
                  type="text" 
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="홍길동" 
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">연락처</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={13}
                  className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="010-1234-5678" 
                  required
                />
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[12px] text-slate-600 space-y-2">
                <div className="grid grid-cols-[85px_1fr] gap-1"><span className="font-bold text-slate-700">① 수집 목적</span><span>: 가입 상담 및 신청</span></div>
                <div className="grid grid-cols-[85px_1fr] gap-1"><span className="font-bold text-slate-700">② 수집 항목</span><span>: 이름, 연락처</span></div>
                <div>
                    <span className="font-bold text-slate-700">③ 보유, 이용기간</span>
                    <div className="mt-1.5 ml-1 space-y-1 text-slate-500">
                        <div className="flex gap-2"><span>•</span><span>개통 완료 시 : D+1095일</span></div>
                        <div className="flex gap-2"><span>•</span><span>단순 상담 시 : D+14일 후 파기</span></div>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-200">
                    <input 
                      type="checkbox" 
                      id="agree" 
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 accent-blue-600" 
                    />
                    <label htmlFor="agree" className="text-xs font-bold text-slate-800 cursor-pointer">개인정보 수집 및 이용에 동의합니다 (필수)</label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-[#E7710F] text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition active:scale-95 disabled:bg-slate-400"
              >
                {isSubmitting ? '처리 중...' : '비밀지원금 안내 받기'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}