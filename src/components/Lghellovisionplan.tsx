export default function Lghellovisionplan() {
  return (
    <div>
      <section className="container benefit">
      <div className="flex flex-col gap-2 mb-12">
        {/* 서브 헤드: 작고 선명한 회색 톤 */}
        <div className="text-stone-500 text-sm font-semibold tracking-widest uppercase">
          LG헬로비전
        </div>
        
        {/* 메인 헤드: 큼직하고 묵직한 볼드체 */}
        <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
          LG헬로비전 요금제 안내
        </div>
        
        {/* 구분선 (애플의 세련된 요소) */}
        <div className="w-16 h-1 bg-blue-600 mt-2 mb-4"></div>
        
        {/* 간단 설명 */}
        <div className="text-stone-600 text-lg lg:text-xl font-medium">
          귀하의 라이프스타일에 최적화된 통신 요금을 선택하세요.
        </div>
      </div>

        {/* 인터넷 + WIFI 요금표 */}
        <div className="w-full overflow-x-auto lg:my-10 my-6">
          <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
            <div className="bg-blue-600 border-t border-x border-stone-300 flex items-center justify-center h-10 lg:h-16 relative">
              <span className="text-white text-base lg:text-xl font-bold">인터넷 + WIFI</span>
            </div>
            
            {/* 상품 영역 */}
            <div className="grid grid-cols-3 border border-stone-300">
              {[{t:"100Mbps", d:"광랜 인터넷", s:"1~2인 가구 추천"},{t:"500Mbps", d:"기가라이트 인터넷", s:"3~4인 가구 추천"},{t:"1Gbps", d:"기가 인터넷", s:"방송 송출 및 전문작업용"}].map((v, i) => (
                <div key={i} className={`flex flex-col items-center justify-center bg-white py-5 gap-1 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-blue-600 text-xl lg:text-3xl font-extrabold tracking-tight">{v.t}</span>
                  <span className="text-black text-sm lg:text-lg font-bold">{v.d}</span>
                  <span className="text-stone-500 text-xs lg:text-sm font-medium">{v.s}</span>
                </div>
              ))}
            </div>
            
            {/* 요금 영역 */}
            <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
              {["20,790원", "30,360원", "31,900원"].map((p, i) => (
                <div key={i} className={`flex items-center justify-center bg-white py-4 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-black text-sm lg:text-xl font-bold">월 {p}</span>
                </div>
              ))}
            </div>

            {/* 할인 영역 */}
            <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
              {["16,500원", "23,100원", "25,300원"].map((p, i) => (
                <div key={i} className={`flex items-center gap-2 justify-center bg-white py-4 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-stone-600 text-xs lg:text-sm font-medium">모바일 결합시</span>
                  <span className="text-blue-600 text-base lg:text-2xl font-extrabold">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 지원금 및 TV 결합 섹션 */}
      <section className="container py-10 lg:py-20">
        <div className="flex items-center justify-center gap-2 text-center pb-8">
          <span className="text-3xl lg:text-5xl">🎁</span>
          <div className="text-primary text-3xl lg:text-5xl font-extrabold tracking-tight">인터넷 단독 최대 지원금 48만원!</div>
        </div>

        {/* TV 결합 상품 반복 구간 */}
        {[
          {title: "이코노미 TV", sub: "실속형 183채널", items: ["100Mbps + 이코노미 TV","500Mbps + 이코노미 TV","1Gbps + 이코노미 TV"], prices: ["29,530원","38,500원","38,500원"], disc: ["20,900원","30,800원","30,800원"]},
          {title: "뉴베이직 TV", sub: "인기형 212채널", items: ["100Mbps + 뉴베이직 TV","500Mbps + 뉴베이직 TV","1Gbps + 뉴베이직 TV"], prices: ["31,730원","40,700원","40,700원"], disc: ["23,100원","33,000원","33,000원"]},
          {title: "Pro라이트 TV", sub: "고급형 253채널", items: ["100Mbps + Pro라이트 TV","500Mbps + Pro라이트 TV","1Gbps + Pro라이트 TV"], prices: ["38,660원","41,690원","42,900원"], disc: ["27,500원","30,530원","30,800원"]}
        ].map((tv, idx) => (
          <div key={idx} className="w-full overflow-x-auto lg:my-10 my-6">
            <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
              <div className="bg-blue-600 flex items-center justify-center h-10 lg:h-16 relative">
                <span className="text-white text-base lg:text-xl font-bold">인터넷 + WIFI + {tv.title} <span className="bg-[#FFD93D] text-black px-2 py-0.5 rounded-md ml-2 text-sm font-semibold">({tv.sub})</span></span>
              </div>
              <div className="grid grid-cols-3 border border-stone-300">
                {tv.items.map((it, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center bg-white py-4 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                    <span className="text-blue-600 text-lg lg:text-xl font-extrabold">{it}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
                {tv.prices.map((p, i) => <div key={i} className={`flex items-center justify-center bg-white py-3 ${i!==0 ? 'border-l border-stone-300' : ''}`}><span className="text-black font-bold text-lg">월 {p}</span></div>)}
              </div>
              <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
                {tv.disc.map((d, i) => <div key={i} className={`flex items-center justify-center gap-2 bg-white py-3 ${i!==0 ? 'border-l border-stone-300' : ''}`}><span className="text-stone-600 text-sm font-medium">모바일 결합시</span><span className="text-blue-600 font-extrabold text-xl">{d}</span></div>)}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 결합 할인 및 제휴 카드 섹션 */}
      <section className="container py-10 lg:py-20 space-y-10">
        <div className="flex flex-col gap-2 mb-12">
          {/* 서브 헤드 */}
          <div className="text-blue-600 text-sm font-semibold tracking-widest uppercase">
            Saving Guide
          </div>
          
          {/* 메인 헤드 */}
          <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
            인터넷 비용 절약 TIP
          </div>
          
          {/* 포인트 컬러 라인 */}
          <div className="w-16 h-1 bg-yellow-400 mt-2 mb-4"></div>
          
          {/* 안내 텍스트 */}
          <div className="text-stone-600 text-lg lg:text-xl font-medium">
            결합 할인과 제휴 카드로 매월 고정비를 획기적으로 줄여보세요.
          </div>
        </div>
          
        {/* 첫 번째, 결합할인 */}
        <div className="flex items-center justify-center gap-2 text-center pb-6">
          <span className="text-3xl lg:text-5xl">🤝</span>
          <div className="text-primary text-3xl lg:text-5xl font-extrabold tracking-tight">첫 번째, 결합할인!</div>
        </div>
        
        <div className="w-full mx-auto space-y-8">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] border border-stone-300">
              <div className="bg-blue-600 grid grid-cols-3 py-4 text-white font-bold text-center text-sm lg:text-lg">
                <span>결합 종류</span><span>결합 조건</span><span>인터넷 할인</span>
              </div>

              {/* 헬로모바일 결합 테이블 행들 */}
              <div className="grid grid-cols-3 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
                <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">인터넷 + 휴대폰</div>
                <div className="col-span-2">
                  <div className="grid grid-cols-2 border-b border-stone-300">
                    <div className="p-4 border-r border-stone-300 text-stone-600">헬로모바일 결합</div>
                    <div className="p-4 text-stone-600">헬로모바일 + 헬로tv 뉴베이직/뉴프리미엄</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-stone-300">
                    <div className="p-4 border-r border-stone-300 text-stone-600">온가족케이블플랜</div>
                    <div className="p-4 text-stone-600">SKT 모바일 2회선 이상 + 헬로비전 인터넷</div>
                  </div>
                  <div className="grid grid-cols-2 border-b border-stone-300">
                    <div className="p-4 border-r border-stone-300 text-stone-600">케이블 총액 결합할인</div>
                    <div className="p-4 text-stone-600">KT 모바일 1회선 이상 + 헬로비전 인터넷</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-4 border-r border-stone-300 text-stone-600">참 쉬운 케이블 가족결합</div>
                    <div className="p-4 text-stone-600">LG U+ 모바일 1회선 이상 + 헬로비전 인터넷</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="container space-y-10">
          <h3 className="text-black lg:text-3xl text-xl font-bold">인터넷 속도별 결합 할인 금액</h3>
          <div className="w-full overflow-x-auto lg:my-10 my-6">
            <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
                
                {/* 헤더 */}
                <div className="bg-blue-600 border-t border-x border-stone-300 grid grid-cols-5 items-center justify-center h-10 lg:h-14 relative text-white text-sm lg:text-base font-bold text-center">
                    <span>구분</span>
                    <span>결합 종류</span>
                    <span>100M</span>
                    <span>500M</span>
                    <span>1G</span>
                </div>

                {/* 첫번째 row */}
                <div className="grid grid-cols-5 border border-stone-300 text-center text-sm lg:text-base font-medium bg-white">
                    <div className="flex items-center justify-center border-r border-stone-300 py-4 font-bold text-blue-600">LG / KT / SK</div>
                    <div className="flex flex-col border-r border-stone-300">
                        <span className="py-4 border-b border-stone-300">인터넷 단독</span>
                        <span className="py-4">인터넷 + TV</span>
                    </div>
                    <div className="flex flex-col border-r border-stone-300">
                        <span className="py-4 border-b border-stone-300">5,090원</span>
                        <span className="py-4">2,537원</span>
                    </div>
                    <div className="flex flex-col border-r border-stone-300">
                        <span className="py-4 border-b border-stone-300">5,860원</span>
                        <span className="py-4">2,922원</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="py-4 border-b border-stone-300">6,160원</span>
                        <span className="py-4">6,160원</span>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* 두 번째, 제휴카드 할인 */}
        <div className="flex items-center justify-center gap-2 text-center pt-10 pb-6">
          <span className="text-3xl lg:text-5xl">💳</span>
          <div className="text-primary text-3xl lg:text-5xl font-extrabold tracking-tight">두 번째, 제휴카드 할인!</div>
        </div>

        <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] border border-stone-300">
          <div className="bg-blue-600 grid grid-cols-3 py-4 text-white font-bold text-center text-sm lg:text-lg">
            <span>카드사</span><span>카드명</span><span>할인 혜택</span>
          </div>

          {[
            { company: "국민카드", cards: ["LG헬로비전 KB국민카드"], benefit: ["전월 30만원 이상 실적 12,000원 할인"] },
            { company: "롯데카드", cards: ["LG헬로비전 롯데카드"], benefit: ["전월 30만원 이상 실적 15,000원 할인"] },
            { company: "하나카드", cards: ["LG헬로비전 더 심플 하나카드"], benefit: ["전월 30만원 이상 실적 10,000원 할인"] }
          ].map((item, i) => (
            <div key={i} className="grid grid-cols-3 border-t border-stone-300 text-center font-medium text-sm lg:text-base">
              <div className="border-r border-stone-300 font-bold flex items-center justify-center p-4 bg-stone-50">{item.company}</div>
              <div className="col-span-2">
                {item.cards.map((card, idx) => (
                  <div key={idx} className={`grid grid-cols-2 ${idx !== item.cards.length - 1 ? 'border-b border-stone-300' : ''}`}>
                    <div className="p-4 border-r border-stone-300 font-bold text-blue-600 flex items-center justify-center">{card}</div>
                    <div className="p-4 flex items-center justify-center font-bold text-stone-600">{item.benefit[idx]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-stone-500 lg:text-3xl text-xl text-center !leading-[1.3] lg:pt-10 pt-6">
          <span className="text-primary font-bold block">가장 결합 혜택이 좋은 LG헬로비전!</span>
          결합할인부터 제휴카드까지, 놓치지 말고 절약하세요!
        </p>
      </section>
    </div>
  );
}