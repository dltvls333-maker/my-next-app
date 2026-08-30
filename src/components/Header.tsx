'use client';

import { useState, useEffect } from 'react';

interface MenuItem {
  name: string;
  link: string;
}

// 1. 컴포넌트 바깥에 기본 메뉴를 고정하여 서버/클라이언트 첫 렌더링 시점에 무조건 즉시 출력되도록 함
const INITIAL_MENUS: MenuItem[] = [
  { name: '홈', link: '/' },
  { name: '인터넷', link: '/internet' },
  { name: '휴대폰', link: '/phone' },
  { name: '가전렌탈', link: '/rental' },
  { name: '고객후기', link: '/review' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [logo, setLogo] = useState<{ logo_path: string; logo_name: string } | null>(null);
  
  // 2. 초기 상태를 빈 배열이 아닌 기본 메뉴로 고정
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENUS);
  const [activeMenu, setActiveMenu] = useState<string>('홈');

  useEffect(() => {
    // 로고 데이터 로드
    fetch('/api/logo')
      .then((res) => res.json())
      .then((data) => {
        if (data) setLogo(data);
      })
      .catch((err) => console.error("로고 로드 실패:", err));

    // 메뉴 데이터 로드 (백그라운드 비동기 처리)
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setMenuItems(data);
          
          const currentPath = window.location.pathname;
          const matched = data.find((item: MenuItem) => 
            currentPath === item.link || (item.link !== '/' && currentPath.startsWith(item.link))
          );
          
          if (matched) {
            setActiveMenu(matched.name);
          } else if (currentPath === '/') {
            const homeMenu = data.find((item: MenuItem) => item.link === '/' || item.name === '홈');
            setActiveMenu(homeMenu ? homeMenu.name : data[0].name);
          } else {
            setActiveMenu(data[0].name);
          }
        }
      })
      .catch((err) => console.error("메뉴 로드 실패:", err));
  }, []);

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
                className="h-18 md:h-18 w-auto object-contain"
              />
            </a>
          </div>

          {/* PC용 네비게이터 + 전화번호 통합 영역 */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex space-x-10 items-center">
              {menuItems.map((item, index) => (
                <a 
                  key={index} 
                  href={item.link} 
                  onClick={() => setActiveMenu(item.name)}
                  className={`text-[17px] font-semibold transition ${activeMenu === item.name ? 'text-[#2d433f] font-bold' : 'text-[#334155] hover:text-[#2d433f]'}`}
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <a href="tel:1661-0588" className="flex items-center gap-2 px-5 py-2.5 bg-white border border-[#2d433f] rounded-full text-[#ff6600] font-bold hover:bg-slate-50 transition text-[16px] shrink-0">
              <span className="text-[#ff6600]">📞</span> 1661-0588
            </a>
          </div>

          {/* 모바일 햄버거 메뉴 + 전화번호 */}
          <div className="flex md:hidden items-center gap-3">
            <a href="tel:1661-0588" className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#2d433f] rounded-full text-[#ff6600] font-bold text-[14px]">
              <span className="text-[#ff6600]">📞</span> 1661-0588
            </a>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-[#475569]">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? <path strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeWidth="2" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 전용 로고 밑 가로 메뉴 영역 (스켈레톤 조건문 완전 제거) */}
        <div className="md:hidden py-3 px-2 border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none">
          <nav className="flex items-center justify-around w-full text-[15px] font-semibold text-[#334155]">
            {menuItems.map((item, index) => {
              const isActive = activeMenu === item.name;
              return (
                <a 
                  key={index} 
                  href={item.link} 
                  onClick={() => setActiveMenu(item.name)}
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
          {menuItems.map((item, index) => (
            <a 
              key={index} 
              href={item.link} 
              onClick={() => {
                setActiveMenu(item.name);
                setIsOpen(false);
              }}
              className={`block px-4 py-4 text-[16px] font-medium rounded-lg ${activeMenu === item.name ? 'text-[#2d433f] font-bold bg-slate-50' : 'text-[#334155] hover:bg-slate-50'}`} 
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}