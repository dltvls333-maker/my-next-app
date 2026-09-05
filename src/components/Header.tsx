'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // 1. usePathname 임포트

interface MenuItem {
  name: string;
  link: string;
}

const INITIAL_MENUS: MenuItem[] = [
  { name: '홈', link: '/' },
  { name: '인터넷', link: '/internet' },
  { name: '고객후기', link: '/reviews' },
];

export default function Header() {
  const pathname = usePathname(); // 2. 현재 경로 실시간 감지
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [logo, setLogo] = useState<{ logo_path: string; logo_name: string } | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENUS);

  // 로고 및 메뉴 데이터 비동기 로드
  useEffect(() => {
    fetch('/api/logo')
      .then((res) => res.json())
      .then((data) => {
        if (data) setLogo(data);
      })
      .catch((err) => console.error("로고 로드 실패:", err));

    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setMenuItems(data);
        }
      })
      .catch((err) => console.error("메뉴 로드 실패:", err));
  }, []);

  // 3. 현재 경로(pathname)와 메뉴의 link를 비교하여 활성화 여부 판단 함수 작성
  const checkIsActive = (itemLink: string) => {
    if (itemLink === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(itemLink);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      {/* 상단 광고 배너 */}
      {isBannerVisible && (
        <div className="bg-[#2d433f] text-white py-2.5 px-4 text-center text-[13px] md:text-[14px] flex justify-center items-center relative">
          <p>🎉 지금 가입하면 최대 250만원 지원! 바로넷 특별 혜택을 확인하세요.</p>
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
                className="h-20 md:h-18 w-auto object-contain"
              />
            </a>
          </div>

          {/* PC용 네비게이터 + 전화번호 통합 영역 */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex space-x-10 items-center">
              {menuItems.map((item, index) => {
                const isActive = checkIsActive(item.link);
                return (
                  <a 
                    key={index} 
                    href={item.link} 
                    className={`text-[17px] font-semibold transition ${isActive ? 'text-[#2d433f] font-bold' : 'text-[#334155] hover:text-[#2d433f]'}`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
            <a href="tel:1833-5660" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#2d433f] rounded-full text-[#ff6600] font-bold hover:bg-slate-50 transition text-[16px] shrink-0">
              <span className="text-[#ff6600]">📞</span> 1833-5660
            </a>
          </div>

          {/* 모바일 햄버거 메뉴 + 전화번호 */}
          <div className="flex md:hidden items-center gap-3">
            <a href="tel:1833-5660" className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#2d433f] rounded-full text-[#ff6600] font-bold text-[14px]">
              <span className="text-[#ff6600]">📞</span> 1833-5660
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#475569]">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeWidth="2" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 전용 로고 밑 가로 메뉴 영역 */}
        <div className="md:hidden py-3 px-2 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none">
          <nav className="flex items-center justify-around w-full text-[15px] font-semibold text-[#334155]">
            {menuItems.map((item, index) => {
              const isActive = checkIsActive(item.link); // 4. 실시간 경로 기반 활성화 체크
              return (
                <a 
                  key={index} 
                  href={item.link} 
                  className={`transition px-3 py-1 relative pb-3 ${isActive ? 'text-[#2d433f] font-bold' : 'hover:text-[#2d433f]'}`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#2d433f] rounded-full transition-all duration-300"></span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 모바일 햄버거 메뉴 클릭 시 펼쳐지는 영역 */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive = checkIsActive(item.link);
            return (
              <a 
                key={index} 
                href={item.link} 
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-4 text-[16px] font-medium rounded-lg ${isActive ? 'text-[#2d433f] font-bold bg-slate-50' : 'text-[#334155] hover:bg-slate-50'}`} 
              >
                {item.name}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}