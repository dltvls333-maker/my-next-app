'use client';
import { useState } from 'react';

export default function CompanyInfoManager({ initialInfo }: { initialInfo: any }) {
  const [info, setInfo] = useState(initialInfo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/company-info', {
      method: 'POST',
      body: JSON.stringify(info),
    });
    if (res.ok) alert('회사 정보가 수정되었습니다.');
    else alert('수정에 실패했습니다.');
  };

  return (
    <div className="bg-white py-8">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: '상호', key: 'company_name' },
          { label: '대표자', key: 'ceo_name' },
          { label: '사업자등록번호', key: 'business_reg_num' },
          { label: '통신판매업신고', key: 'mail_order_reg_num' },
        ].map((field) => (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium text-slate-500">{field.label}</label>
            <input
              type="text"
              value={info[field.key] || ''}
              onChange={(e) => setInfo({ ...info, [field.key]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>
        ))}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-slate-500">주소</label>
          <input
            type="text"
            value={info.address || ''}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold">
            + 변경 사항 저장
          </button>
        </div>
      </form>
    </div>
  );
}