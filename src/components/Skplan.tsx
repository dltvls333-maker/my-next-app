export default function SkPlan() {
  return (
    <div>
      <section className="container benefit">
      <div className="flex flex-col gap-2 mb-12">
        {/* 서브 헤드: 작고 선명한 회색 톤 */}
        <div className="text-stone-500 text-sm font-semibold tracking-widest uppercase">
          SK Broadband
        </div>
        
        {/* 메인 헤드: 큼직하고 묵직한 볼드체 */}
        <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
          SK 요금제 안내
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
              {["23,100원", "34,100원", "39,600원"].map((p, i) => (
                <div key={i} className={`flex items-center justify-center bg-white py-4 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-black text-sm lg:text-xl font-bold">월 {p}</span>
                </div>
              ))}
            </div>

            {/* 할인 영역 */}
            <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
              {["18,700원", "23,100원", "31,900원"].map((p, i) => (
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

        {/* 2. TV 결합 상품 반복 구간 */}
      {[
        { 
          title: "이코노미 TV", sub: "절약형 236채널", 
          items: [
            { name: "100Mbps + 베이직 TV", type: "광랜 인터넷", desc: "경제적인 금액대의 TV" },
            { name: "500Mbps + 베이직 TV", type: "기가라이트 인터넷", desc: "실속형 TV" },
            { name: "1Gbps + 베이직 TV", type: "기가 인터넷", desc: "경제적인 금액대의 TV" }
          ], 
          prices: ["36,300원", "42,900원", "48,400원"], disc: ["31,900원", "36,300원", "39,600원"] 
        },
        { 
          title: "스탠다드 TV", sub: "실속형 236채널", 
          items: [
            { name: "100Mbps + 라이트 TV", type: "광랜 인터넷", desc: "실속형 TV" },
            { name: "500Mbps + 라이트 TV", type: "기가라이트 인터넷", desc: "실속형 TV" },
            { name: "1Gbps + 라이트 TV", type: "기가 인터넷", desc: "실속형 TV" }
          ], 
          prices: ["35,200원", "46,200원", "51,700원"], disc: ["35,200원", "39,600원", "42,900원"] 
        },
        { 
          title: "ALL TV", sub: "고급형 252채널", 
          items: [
            { name: "100Mbps + 에센스 TV", type: "광랜 인터넷", desc: "고급형 TV" },
            { name: "500Mbps + 에센스 TV", type: "기가라이트 인터넷", desc: "고급형 TV" },
            { name: "1Gbps + 에센스 TV", type: "기가 인터넷", desc: "고급형 TV" }
          ], 
          prices: ["42,900원", "49,500원", "55,000원"], disc: ["38,500원", "42,900원", "46,200원"] 
        }
      ].map((tv, idx) => (
        <div key={idx} className="container w-full overflow-x-auto lg:my-10 my-6">
          <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
            <div className="bg-blue-600 flex items-center justify-center h-10 lg:h-16 relative">
              <span className="text-white text-base lg:text-xl font-bold">
                인터넷 + WIFI + {tv.title} 
                <span className="bg-[#FFD93D] text-black px-2 py-0.5 rounded-md ml-2 text-sm font-semibold">({tv.sub})</span>
              </span>
            </div>
            {/* 상품명 및 타입 출력 */}
            <div className="grid grid-cols-3 border border-stone-300">
              {tv.items.map((it, i) => (
                <div key={i} className={`flex flex-col items-center justify-center bg-white py-4 ${i !== 0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-blue-600 text-lg lg:text-xl font-extrabold mb-1">{it.name}</span>
                  <span className="text-black text-sm lg:text-base font-normal">{it.type}</span>
                  <span className="text-stone-500 text-xs lg:text-sm font-normal">{it.desc}</span>
                </div>
              ))}
            </div>
            {/* 가격 */}
            <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
              {tv.prices.map((p, i) => (
                <div key={i} className={`flex items-center justify-center bg-white py-3 ${i !== 0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-black font-bold text-lg">월 {p}</span>
                </div>
              ))}
            </div>
            {/* 할인 */}
            <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
              {tv.disc.map((d, i) => (
                <div key={i} className={`flex items-center justify-center gap-2 bg-white py-3 ${i !== 0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-stone-600 text-sm font-medium">모바일 결합시</span>
                  <span className="text-blue-600 font-extrabold text-xl">{d}</span>
                </div>
              ))}
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
      
      <div className="w-full overflow-x-auto">
        <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] border border-stone-300">
          <div className="bg-blue-600 grid grid-cols-4 py-4 text-white font-bold text-center text-sm lg:text-lg">
            <span>결합 종류</span><span>결합 조건</span><span>인터넷 할인</span><span>휴대폰 할인</span>
          </div>
          
          {/* row 1 */}
          <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
            <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">온 가족할인</div>
            <div className="p-4 border-r border-stone-300 flex flex-col justify-center gap-1">
              <span>가족 가입 연수</span><span className="font-bold">총합에 따라 차등</span>
            </div>
            <div className="p-4 border-r border-stone-300 text-stone-600 space-y-1">
              <div><span className="font-bold">-10년 미만</span> 10%</div>
              <div><span className="font-bold">-20년 미만</span> 20%</div>
              <div><span className="font-bold">-30년 미만</span> 30%</div>
              <div><span className="font-bold">-30년 이상</span> 50%</div>
            </div>
            <div className="p-4 text-stone-600 space-y-1">
              <div><span className="font-bold">-20년 미만</span> 0%</div>
              <div><span className="font-bold">-20년 이상</span> 10%</div>
              <div><span className="font-bold">-30년 이상</span> 30%</div>
              <div className="text-xs text-stone-400 mt-2">(2015.04 이후 요금제)</div>
            </div>
          </div>

          {/* row 2 */}
          <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium bg-stone-50">
            <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-blue-600">요즘 가족결합</div>
            <div className="p-4 border-r border-stone-300 flex items-center justify-center">
              휴대폰 1~5회선까지 결합 가능
            </div>
            <div className="p-4 border-r border-stone-300 space-y-1">
              <div className="font-bold">100M - 4,400원</div>
              <div className="font-bold">500M - 11,000원</div>
              <div className="font-bold">1G - 13,200원</div>
            </div>
            <div className="p-4 flex items-center justify-center font-extrabold text-blue-600">
              최소 3,500 ~ 최대 24,000원
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
        <div className="overflow-x-auto shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] rounded-[10px] border border-stone-300">
          <div className="min-w-[767px]">
            <div className="bg-blue-600 grid grid-cols-3 py-4 text-white font-bold text-center text-sm lg:text-lg rounded-t-[10px]">
              <span>카드사</span><span>카드명</span><span>할인 혜택</span>
            </div>
            {[
              ["롯데카드", "SK브로드밴드 B롯데카드", "50만원 이상 실적 10,000원 할인"],
              ["삼성카드", "SK브로드밴드 삼성카드", "30만원 이상 실적 7,000원 할인"]
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-t border-stone-300 text-center py-5 font-medium text-sm lg:text-base last:rounded-b-[10px]">
                <div className="border-r border-stone-300 font-bold">{row[0]}</div>
                <div className="border-r border-stone-300 font-bold text-blue-600 px-1">{row[1]}</div>
                <div className="font-bold px-1">{row[2]}</div>
              </div>
            ))}
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