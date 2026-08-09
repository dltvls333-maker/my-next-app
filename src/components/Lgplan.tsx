export default function LgPlan() {
  return (
    <div>
      <section className="container benefit">
      <div className="flex flex-col gap-2 mb-12">
        {/* 서브 헤드: 작고 선명한 회색 톤 */}
        <div className="text-stone-500 text-sm font-semibold tracking-widest uppercase">
          LG
        </div>
        
        {/* 메인 헤드: 큼직하고 묵직한 볼드체 */}
        <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
          LG 요금제 안내
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
              {["22,000원", "33,000원", "38,500원"].map((p, i) => (
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
          {title: "베이직 TV", sub: "절약형 212채널", items: ["100Mbps + 베이직 TV","500Mbps + 베이직 TV","1Gbps + 베이직 TV"], prices: ["38,500원","44,000원","49,500원"], disc: ["33,000원","39,600원","39,600원"]},
          {title: "프리미엄 TV", sub: "실속형 253채널", items: ["100Mbps + 프리미엄 TV","500Mbps + 프리미엄 TV","1Gbps + 프리미엄 TV"], prices: ["42,900원","48,400원","53,900원"], disc: ["37,400원","38,500원","40,700원"]},
          {title: "프라임 TV", sub: "고급형 258채널", items: ["100Mbps + 프라임 TV","500Mbps + 프라임 TV","1Gbps + 프라임 TV"], prices: ["45,100원","50,200원","56,100원"], disc: ["39,600원","40,300원","42,900원"]}
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
  <div className="w-full mx-auto space-y-8_tab1">
  {/* 상단 테이블과 동일한 폰트/스타일 컨테이너 */}
  <div className="w-full overflow-x-auto_tab1">
    <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] border border-stone-300">
      <div className="bg-blue-600 grid grid-cols-4 py-4 text-white font-bold text-center text-sm lg:text-lg">
        <span>결합 종류</span><span>결합 조건</span><span>인터넷 할인</span><span>휴대폰 할인</span>
      </div>

      {/* 특수 상황 (행 병합 처리) */}
      <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
        <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">특수 상황</div>
        <div className="col-span-3">
          <div className="grid grid-cols-3 border-b border-stone-300">
            <div className="p-4 border-r border-stone-300 flex items-center justify-center">신혼플러스</div>
            <div className="p-4 border-r border-stone-300 text-stone-600">예비 부부, 신혼 부부<br />5g: 85요금제 LTE: 78요금제 이상</div>
            <div className="p-4 text-stone-600">모바일 요금 6개월 무료<br />+ 월 최대 22,850원 할인</div>
          </div>
          <div className="grid grid-cols-3 border-b border-stone-300">
            <div className="p-4 border-r border-stone-300 flex items-center justify-center">펫플러스</div>
            <div className="p-4 border-r border-stone-300 text-stone-600">스마트홈</div>
            <div className="p-4 text-stone-600">공기청정기 렌탈료 최대 21,000원 할인<br />구매 시 약 23만원 할인</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-4 border-r border-stone-300 flex items-center justify-center">시니어 플러스</div>
            <div className="p-4 border-r border-stone-300 text-stone-600">약 65세 이상 사용자</div>
            <div className="p-4 text-stone-600">인터넷 3,100원 추가 할인</div>
          </div>
        </div>
      </div>

      {/* 인터넷 + 휴대폰 (행 병합 처리) */}
      <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
        <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">인터넷 + 휴대폰</div>
        <div className="col-span-3">
          <div className="grid grid-cols-3 border-b border-stone-300">
            <div className="p-4 border-r border-stone-300 flex items-center justify-center">투게더 결합</div>
            <div className="p-4 border-r border-stone-300 text-stone-600">모바일 5회선, 인터넷 5회선까지<br />요금제에 따라 할인 금액 변동</div>
            <div className="p-4 text-stone-600">인터넷 11,000원 /<br />휴대폰 최대 20,000원 할인</div>
          </div>
          <div className="grid grid-cols-3">
            <div className="p-4 border-r border-stone-300 flex items-center justify-center">참 쉬운 가족결합</div>
            <div className="p-4 border-r border-stone-300 text-stone-600">모바일 10회선, 인터넷 3회선까지<br />요금제에 따라 할인 금액 변동</div>
            <div className="p-4 text-stone-600">인터넷 13,200원 /<br />휴대폰 최대 5,500원 할인</div>
          </div>
        </div>
      </div>

      {/* 패밀리 결합 */}
      <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
        <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">인터넷 + 인터넷</div>
        <div className="p-4 border-r border-stone-300 flex items-center justify-center">패밀리 결합</div>
        <div className="p-4 border-r border-stone-300 text-stone-600">인터넷 2대 이상</div>
        <div className="p-4 text-stone-600">인터넷 5,500원</div>
      </div>
    </div>
  </div>
</div>

            <p className="text-center lg:my-10 my-6 text-stone-500 lg:text-2xl text-xl !leading-[1.5] ">2명이상 85,000원 이상 요금제를 쓰고
                 있다면?<span className="text-primary block font-bold ">→ 투게더
                결합</span>
            </p>
        <p className="text-center lg:my-10 my-6 text-stone-500 lg:text-2xl text-xl !leading-[1.5] ">그 이하라면?<span
                className="text-primary block font-bold ">→ 참 쉬운 가족 결합!</span></p>

<section className="container space-y-10">
    <h3 className="text-black lg:text-3xl text-xl font-bold">휴대폰 회선 수에 따른 결합 할인금액</h3>
    <div className="w-full overflow-x-auto lg:my-10 my-6">
        <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
            
            {/* 결합할인 헤더 */}
            <div className="bg-blue-600 border-t border-x border-stone-300 flex items-center justify-center h-10 lg:h-14 relative grid grid-cols-6">
                <span className="text-white text-sm lg:text-base font-bold text-center w-full">구분</span>
                <span className="text-white text-sm lg:text-base font-bold text-center w-full">월 요금</span>
                <span className="text-white text-sm lg:text-base font-bold text-center w-full">1회선</span>
                <span className="text-white text-sm lg:text-base font-bold text-center w-full">2회선</span>
                <span className="text-white text-sm lg:text-base font-bold text-center w-full">3회선</span>
                <span className="text-white text-sm lg:text-base font-bold text-center w-full">4회선~</span>
            </div>

            {/* 인터넷 할인 바 */}
            <div className="bg-blue-500 flex items-center justify-center h-12 lg:h-14 relative grid grid-cols-1 text-white text-sm lg:text-base font-bold text-center w-full border-t border-stone-300">
                인터넷 할인
            </div>

            {/* 결합할인 1번째 row (참 쉬운 가족결합) */}
            <div className="grid grid-cols-12 border border-stone-300">
                {/* 구분 */}
                <span className="flex flex-col items-center justify-center col-span-2 border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    참 쉬운 가족결합
                </span>

                {/* 월 요금 3개 구간 */}
                <div className="col-span-2 flex flex-col border-r border-stone-300">
                    <span className="flex flex-col border-l border-b items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        69,000원 미만
                    </span>
                    <span className="flex flex-col border-l items-center list-none border-b border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        69,000원 이상
                    </span>
                    <span className="flex flex-col border-l items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        88,000원 이상
                    </span>
                </div>

                {/* 1회선 - 할인X */}
                <span className="flex flex-col items-center justify-center col-span-2 border-stone-300 border-r bg-white py-4 gap-1 text-black text-sm font-normal list-none h-full">
                    할인X
                </span>

                {/* 2회선 금액 3개 */}
                <div className="col-span-2 flex flex-col border-r border-stone-300">
                    <span className="flex flex-col border-b items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        2,200원
                    </span>
                    <span className="flex flex-col border-b items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        3,300원
                    </span>
                    <span className="flex flex-col items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        4,400원
                    </span>
                </div>

                {/* 3회선 금액 3개 */}
                <div className="col-span-2 flex flex-col border-r border-stone-300">
                    <span className="flex flex-col border-b items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        3,300원
                    </span>
                    <span className="flex flex-col border-b items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        5,500원
                    </span>
                    <span className="flex flex-col items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        6,600원
                    </span>
                </div>

                {/* 4회선~ 금액 3개 */}
                <div className="col-span-2 flex flex-col">
                    <span className="flex flex-col border-b items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        4,400원
                    </span>
                    <span className="flex flex-col border-b items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        6,600원
                    </span>
                    <span className="flex flex-col items-center list-none border-stone-300 justify-center bg-white py-4 gap-1 text-black text-sm font-normal leading-[1.35] text-center">
                        8,800원
                    </span>
                </div>
            </div>

            {/* 투게더 결합 row */}
            <div className="grid grid-cols-6 border border-stone-300 !border-t-0">
                <span className="flex flex-col items-center justify-center border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    투게더 결합
                </span>
                <span className="flex flex-col items-center border-l border-r justify-center border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    88,000원 이상
                </span>
                <span className="flex flex-col items-center justify-center border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    할인X
                </span>
                <span className="flex flex-col items-center justify-center border-l border-r border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    10,000원
                </span>
                <span className="flex flex-col items-center justify-center border-r border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    14,000원
                </span>
                <span className="flex flex-col items-center justify-center border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    20,000원
                </span>
            </div>

            {/* 속도별 요금 구간 헤더 */}
            <div className="grid grid-cols-12 border border-stone-300 !border-t-0 bg-stone-50">
                <span className="flex flex-col items-center justify-center col-span-2 border-r border-stone-300 bg-stone-50 py-4 gap-1 text-black text-sm font-bold list-none">
                </span>
                <span className="flex flex-col items-center justify-center col-span-2 border-stone-300 border-r bg-stone-50 py-4 gap-1 text-black text-sm font-bold list-none">
                    100M
                </span>
                <span className="flex flex-col items-center justify-center col-span-4 border-stone-300 border-r bg-stone-50 py-4 gap-1 text-black text-sm font-bold list-none">
                    500M
                </span>
                <span className="flex flex-col items-center justify-center col-span-4 border-stone-300 bg-stone-50 py-4 gap-1 text-black text-sm font-bold list-none">
                    1G
                </span>
            </div>

            {/* 참 쉬운 가족결합 (속도별) */}
            <div className="grid grid-cols-12 border border-stone-300 !border-t-0">
                <span className="flex flex-col items-center justify-center col-span-2 border-r border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    참 쉬운 가족결합
                </span>
                <span className="flex flex-col items-center justify-center col-span-2 border-stone-300 border-r bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    5,500원
                </span>
                <span className="flex flex-col items-center justify-center col-span-4 border-stone-300 border-r bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    9,900원
                </span>
                <span className="flex flex-col items-center justify-center col-span-4 border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    13,200원
                </span>
            </div>

            {/* 투게더 결합 (속도별) */}
            <div className="grid grid-cols-12 border border-stone-300 !border-t-0">
                <span className="flex flex-col items-center justify-center col-span-2 border-r border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    투게더 결합
                </span>
                <span className="flex flex-col items-center justify-center col-span-2 border-stone-300 border-r bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    결합 불가
                </span>
                <span className="flex flex-col items-center justify-center col-span-8 border-stone-300 bg-white py-4 gap-1 text-black text-sm font-normal list-none">
                    11,000원
                </span>
            </div>

        </div>
    </div>
</section>


     {/* 두 번째, 제휴카드 할인 */}
<div className="flex items-center justify-center gap-2 text-center pt-10 pb-6">
  <span className="text-3xl lg:text-5xl">💳</span>
  <div className="text-blue-600 text-3xl lg:text-5xl font-extrabold tracking-tight">두 번째, 제휴카드 할인!</div>
</div>

{/* 위쪽 컨텐츠들과 width 및 패딩을 완벽히 맞춘 컨테이너 */}
<div className="w-full max-w-[1100px] mx-auto mb-10">
  <div className="overflow-x-auto shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] rounded-[10px] border border-stone-300 bg-white">
    
    {/* 핵심 수정: 모바일 화면에서 잘리지 않고 가로 스크롤이 되도록 고정 너비 설정 */}
    <div className="min-w-[767px]">
      
      {/* 테이블 헤더: 150px, 1fr, 1fr 구조 */}
      <div className="bg-blue-600 grid grid-cols-[150px,1fr,1fr] py-4 text-white font-bold text-center text-sm lg:text-lg rounded-t-[10px]">
        <span>카드사</span>
        <span>카드명</span>
        <span>할인 혜택</span>
      </div>

      {/* 테이블 바디 */}
      {[
        { company: "삼성카드", cards: ["LG U+ 삼성카드"], benefit: ["30만원 이상 실적 7,000원 할인"] },
        { company: "KB국민카드", cards: ["LG U+ 현대카드M Edition3 (통신할인형2.0)"], benefit: ["50만원 이상 실적 15,000원 할인 (1~24개월)"] },
        { 
          company: "하나카드", 
          cards: ["더 심플 하나카드", "LG U+ Family 하나카드"], 
          benefit: [
            "30만원 이상 실적 10,000원 할인", 
            "30만원 이상 실적 통신료 25% 청구할인 (25개월 이후 15% 청구할인)"
          ] 
        },
        { company: "신한카드", cards: ["LG U+ 사장님 통할인 신한카드"], benefit: ["70만원 이상 실적 10,000원 할인 (25개월 이후 6,000원 할인)"] },
        { company: "롯데카드", cards: ["LG U+ x LOCA 롯데카드"], benefit: ["30만원 이상 실적 10,000원 할인 (25개월 이후 6,000원 할인)"] },
        { company: "NH카드", cards: ["NH올원 LG U+ 카드"], benefit: ["30만원 이상 실적 9,000원 할인"] }
      ].map((item, i) => {
        const rowSpan = item.cards.length;
        return (
          <div key={i} className="grid grid-cols-[150px,1fr,1fr] border-t border-stone-300 text-center font-medium text-sm lg:text-base last:rounded-b-[10px] items-stretch">
            
            {/* 카드사 영역: 여러 줄인 경우 행 전체 높이를 채우거나 세로 중앙 정렬 */}
            <div className="border-r border-stone-300 font-bold flex items-center justify-center p-4 bg-stone-50">
              {item.company}
            </div>

            {/* 핵심 수정: 그리드 자식 요소가 레이아웃을 벗어나지 않고 스크롤되도록 min-w-0 추가 */}
            {rowSpan === 1 ? (
              <>
                {/* 카드명 */}
                <div className="border-r border-stone-300 font-bold text-blue-600 flex items-center justify-center p-4 px-1 min-w-0">
                  {item.cards[0]}
                </div>
                {/* 할인 혜택 */}
                <div className="flex items-center justify-center font-bold text-stone-600 p-4 px-1 min-w-0">
                  {item.benefit[0]}
                </div>
              </>
            ) : (
              /* 카드가 2개 이상인 경우 (하나카드 등) 두 컬럼을 통째로 차지하며 내부에서 세로로 쪼개짐 */
              <div className="col-span-2 flex flex-col w-full min-w-0">
                {item.cards.map((card, idx) => (
                  <div key={idx} className={`grid grid-cols-2 w-full ${idx !== rowSpan - 1 ? 'border-b border-stone-300' : ''}`}>
                    <div className="border-r border-stone-300 font-bold text-blue-600 flex items-center justify-center p-4 px-1 min-w-0">
                      {card}
                    </div>
                    <div className="flex items-center justify-center font-bold text-stone-600 p-4 px-1 min-w-0">
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

  <p className="text-stone-500 lg:text-3xl text-xl text-center !leading-[1.3] lg:pt-10 pt-6">

            <span className="text-primary font-bold block ">가장 결합 혜택이 좋은 LG!</span>
            결합할인부터 제휴카드까지, 놓치지말고cd 절약하세요!
        </p>
</section>
    </div>
  );
}