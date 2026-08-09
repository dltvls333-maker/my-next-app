export default function KtPlan() {
  return (
    <div>
      <section className="container benefit">
      <div className="flex flex-col gap-2 mb-12">
        {/* 서브 헤드: 작고 선명한 회색 톤 */}
        <div className="text-stone-500 text-sm font-semibold tracking-widest uppercase">
          KT
        </div>
        
        {/* 메인 헤드: 큼직하고 묵직한 볼드체 */}
        <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
          KT 요금제 안내
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
              {["23,100원", "34,100원", "38,500원"].map((p, i) => (
                <div key={i} className={`flex items-center justify-center bg-white py-4 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-black text-sm lg:text-xl font-bold">월 {p}</span>
                </div>
              ))}
            </div>

            {/* 할인 영역 */}
            <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
              {["17,600원", "28,600원", "33,000원"].map((p, i) => (
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
          <div className="text-primary text-3xl lg:text-5xl font-extrabold tracking-tight">인터넷 단독 최대 지원금 47만원!</div>
        </div>

        {/* TV 결합 상품 반복 구간 */}
        {[
          {title: "베이직 TV", sub: "절약형 236채널", items: ["100Mbps + 베이직 TV","500Mbps + 베이직 TV","1Gbps + 베이직 TV"], prices: ["39,600원","40,700원","49,500원"], disc: ["36,300원","39,600원","44,000원"]},
          {title: "라이트 TV", sub: "실속형 240채널", items: ["100Mbps + 라이트 TV","500Mbps + 라이트 TV","1Gbps + 라이트 TV"], prices: ["40,700원","46,200원","50,600원"], disc: ["37,400원","40,700원","45,100원"]},
          {title: "에센스 TV", sub: "고급형 263채널", items: ["100Mbps + 에센스 TV","500Mbps + 에센스 TV","1Gbps + 에센스 TV"], prices: ["44,000원","49,500원","53,900원"], disc: ["40,700원","44,000원","48,400원"]}
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
  {/* 상단 테이블과 동일한 폰트/스타일 컨테이너 */}
  <div className="w-full overflow-x-auto">
  <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] border border-stone-300">
    <div className="bg-blue-600 grid grid-cols-4 py-4 text-white font-bold text-center text-sm lg:text-lg">
      <span>결합 종류</span><span>결합 조건</span><span>인터넷 할인</span><span>휴대폰 할인</span>
    </div>

    {/* 특수 상황 */}
    <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
      <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">특수 상황</div>
      <div className="p-4 border-r border-stone-300 flex items-center justify-center">프리미엄 싱글결합</div>
      <div className="p-4 border-r border-stone-300 text-stone-600">고가 요금제 1회선<br />+ 500메가 이상 인터넷</div>
      <div className="p-4 text-stone-600">인터넷 5,500원<br />휴대폰 요금 25% 할인</div>
    </div>

    {/* 요즘 가족결합 (행 병합 처리) */}
    <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
      <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">요즘 가족결합</div>
      <div className="col-span-3">
        <div className="grid grid-cols-3 border-b border-stone-300">
          <div className="p-4 border-r border-stone-300 flex items-center justify-center">프리미엄 가족결합</div>
          <div className="p-4 border-r border-stone-300 text-stone-600">고가 요금제 2회선 이상<br />+ 인터넷</div>
          <div className="p-4 text-stone-600">인터넷 5,500원 /<br />휴대폰 요금 25% 할인</div>
        </div>
        <div className="grid grid-cols-3 border-b border-stone-300">
          <div className="p-4 border-r border-stone-300 flex items-center justify-center">총액결합할인</div>
          <div className="p-4 border-r border-stone-300 text-stone-600">요금제 상관X 휴대폰<br />+ 인터넷</div>
          <div className="p-4 text-stone-600">최소 1,650원 ~<br />최대 33,110원 할인</div>
        </div>
        <div className="grid grid-cols-3">
          <div className="p-4 border-r border-stone-300 flex items-center justify-center">3G 뭉치면 올레</div>
          <div className="p-4 border-r border-stone-300 text-stone-600">3G 요금제 사용 + 인터넷</div>
          <div className="p-4 text-stone-600">최소 1,100원 ~<br />최대 22,200원 할인</div>
        </div>
      </div>
    </div>

    {/* 인터넷 + 인터넷 */}
    <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
      <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">인터넷 + 인터넷</div>
      <div className="p-4 border-r border-stone-300 flex items-center justify-center">패밀리 결합</div>
      <div className="p-4 border-r border-stone-300 text-stone-600">인터넷 2대 이상</div>
      <div className="p-4 text-stone-600">인터넷 5,500원</div>
    </div>
  </div>
</div>
</div>

  {/* 두 번째, 제휴카드 할인 */}
<div className="flex items-center justify-center gap-2 text-center pt-10 pb-6">
  <span className="text-3xl lg:text-5xl">💳</span>
  <div className="text-primary text-3xl lg:text-5xl font-extrabold tracking-tight">두 번째, 제휴카드 할인!</div>
</div>

{/* 위쪽 컨텐츠들과 width 및 패딩을 완벽히 맞춘 컨테이너 */}
<div className="w-full max-w-[1100px] mx-auto mb-10">
  <div className="overflow-x-auto shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] rounded-[10px] border border-stone-300 bg-white">
    
    {/* 모바일 화면에서 잘리지 않고 가로 스크롤되도록 최소 너비 설정 */}
    <div className="min-w-[767px]">
      
      {/* 테이블 헤더: 150px, 1fr, 1fr 구조 */}
      <div className="bg-blue-600 grid grid-cols-[150px,1fr,1fr] py-4 text-white font-bold text-center text-sm lg:text-lg rounded-t-[10px]">
        <span>카드사</span>
        <span>카드명</span>
        <span>할인 혜택</span>
      </div>

      {/* 테이블 바디 */}
      {[
        { company: "KB국민카드", cards: ["KB국민 CLiP 카드"], benefit: ["30만원 이상 실적 12,000원 할인"] },
        { company: "현대카드", cards: ["KT-현대카드M Edition3(청구할인형)", "KT-현대카드M Edition3(통신할인형2.0)", "KT-현대카드M Edition3(청구할인형2.0)"], benefit: ["30만원 이상 실적 7,000원 할인", "30만원 이상 실적 7,000원 할인", "100만원 이상 실적 22,000원 할인(1~36개월)"] },
        { company: "신한카드", cards: ["KT 신한 체크카드", "KT 가족만족 DC 신한카드"], benefit: ["30만원 이상 실적 3,000원 캐시백", "30만원 이상 실적 7,000원 할인"] },
        { company: "IBK 카드", cards: ["olleh super DC IBK 카드"], benefit: ["30만원 이상 실적 7,000원 할인"] },
        { company: "삼성카드", cards: ["KT 삼성카드"], benefit: ["30만원 이상 실적 7,000원 할인"] },
        { company: "우리카드", cards: ["KT NU Plus 우리카드"], benefit: ["40만원 이상 실적 10,000원 할인"] },
        { company: "하나카드", cards: ["KT super DC 하나카드", "KT DC Plus 고객용 더 심플 하나카드"], benefit: ["30만원 이상 실적 7,000원 할인", "30만원 이상 실적 10,000원 할인"] },
        { company: "NH농협카드", cards: ["KT 할부 Plus NH농협카드"], benefit: ["40만원 이상 실적 5,000원(할부와 할인 중복 불가)"] },
        { company: "롯데카드", cards: ["KT LOCA X 구독 롯데카드", "KT DC Plus 롯데카드"], benefit: ["30만원 이상 10,000원 할인", "40만원 이상 10,000원 할인"] },
        { company: "비씨카드", cards: ["KT BC바로 SUPER 카드", "KT BC바로 SUPER+ 카드", "KT DC Plus BC 바로카드"], benefit: ["30만원 이상 실적 13,000원 할인(1~24개월)", "50만원 이상 실적 15,000원 할인(1~24개월)", "30만원 이상 실적 7,000원 할인"] },
        { company: "케이뱅크", cards: ["KT멤버십x케이뱅크 더블혜택 체크카드"], benefit: ["20만원 이상 실적 카드 이용금액 5% 캐시백(최대 5,000원)"] }
      ].map((item, i) => {
        const rowSpan = item.cards.length;
        return (
          <div key={i} className="grid grid-cols-[150px,1fr,1fr] border-t border-stone-300 text-center font-medium text-sm lg:text-base last:rounded-b-[10px] items-stretch">
            
            {/* 카드사 영역 (고정 너비 150px, 세로 중앙 정렬) */}
            <div className="border-r border-stone-300 font-bold flex items-center justify-center p-4 bg-stone-50">
              {item.company}
            </div>

            {/* 카드가 1개일 때 */}
            {rowSpan === 1 ? (
              <>
                <div className="border-r border-stone-300 font-bold text-blue-600 flex items-center justify-center p-4 px-1">
                  {item.cards[0]}
                </div>
                <div className="flex items-center justify-center font-bold text-stone-600 p-4 px-1">
                  {item.benefit[0]}
                </div>
              </>
            ) : (
              /* 카드가 2개 이상(현대, 신한, 하나, 롯데, 비씨 등)일 때 남은 두 칸을 채우며 세로로 나열 */
              <div className="col-span-2 flex flex-col w-full">
                {item.cards.map((card, idx) => (
                  <div key={idx} className={`grid grid-cols-2 w-full ${idx !== rowSpan - 1 ? 'border-b border-stone-300' : ''}`}>
                    <div className="border-r border-stone-300 font-bold text-blue-600 flex items-center justify-center p-4 px-1">
                      {card}
                    </div>
                    <div className="flex items-center justify-center font-bold text-stone-600 p-4 px-1">
                      {item.benefit[idx]}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        );
      })}

    </div>
  </div>
</div>

  <p className="text-stone-500 lg:text-2xl text-lg text-center font-medium leading-relaxed pt-10">
    당장 받는 할인 금액이 크지 않아보여도<br />
    3년이라는 시간동안 받는 할인이라고 생각하면<br />
    <span className="text-primary font-extrabold text-xl lg:text-3xl underline decoration-blue-500 underline-offset-4">무조건 받는게 이득</span>입니다!
  </p>
</section>
    </div>
  );
}