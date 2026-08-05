'use client';

import { useState, useEffect } from 'react';

// DB에서 받아올 메뉴 데이터의 타입 정의
interface MenuItem {
  name: string;
  link: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [logo, setLogo] = useState<{ logo_path: string; logo_name: string } | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    // 1. 로고 데이터 로드
    fetch('/api/logo')
      .then((res) => res.json())
      .then((data) => setLogo(data))
      .catch((err) => console.error("로고 로드 실패:", err));

    // 2. 메뉴 데이터 로드 (DB 연동 API 호출)
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch((err) => console.error("메뉴 로드 실패:", err));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      {/* 상단 광고 배너 */}
      {isBannerVisible && (
        <div className="bg-[#1e293b] text-white py-2.5 px-4 text-center text-[13px] md:text-[14px] flex justify-center items-center relative">
          <p>🎉 지금 가입하면 최대 250만원 지원! 이음통신 특별 혜택을 확인하세요.</p>
          <button onClick={() => setIsBannerVisible(false)} className="absolute right-4 hover:text-slate-300 transition">✕</button>
        </div>
      )}

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* 로고 영역 */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img 
                src={logo?.logo_path || "/images/logo.png"} 
                alt={logo?.logo_name || "로고"} 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </a>
          </div>

          {/* PC용 전화번호 및 우측 영역 (전화번호는 우측 상단 유지) */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:1661-0588" className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-bold hover:bg-blue-100 transition text-[16px]">
              <span>📞</span> 1661-0588
            </a>
          </div>

          {/* 모바일 햄버거 메뉴 + 전화번호 */}
          <div className="flex md:hidden items-center gap-3">
            <a href="tel:1661-0588" className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-blue-600 font-bold text-[14px]">
              <span>📞</span> 1661-0588
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#475569]">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeWidth="2" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
              </svg>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 공통(모바일 + PC): 로고 밑에 기호 없이 균등하게 나열되는 네비게이션 영역 */}
        {/* ========================================================= */}
        <div className="py-3 px-2 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none">
          <nav className="flex items-center justify-between sm:justify-center sm:gap-12 w-full text-[15px] font-semibold text-[#334155]">
            {menuItems.map((item, index) => (
              <a 
                key={index} 
                href={item.link} 
                className="hover:text-blue-600 transition px-2"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 모바일 햄버거 메뉴 클릭 시 펼쳐지는 영역 */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-1">
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.link} 
              className="block px-4 py-4 text-[16px] font-medium text-[#334155] hover:bg-slate-50 rounded-lg" 
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}