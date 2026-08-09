export default function Skylifeplan() {
  return (
    <div>
      {/* 첫 번째 섹션: TV 단독 */}
      <section className="container benefit">
        <div className="flex flex-col gap-2 mb-12">
          {/* 포인트 뱃지 */}
          <div className="inline-flex items-center bg-amber-300 text-stone-900 px-3 py-1 rounded-full text-sm font-extrabold w-max tracking-wide uppercase shadow-sm">
            POINT 01
          </div>
          
          {/* 메인 헤드 */}
          <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
            Sky Life 요금표
          </div>
        </div>

        {/* TV 단독 요금표 */}
        <div className="w-full overflow-x-auto lg:my-10 my-6">
          <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
            <div className="bg-blue-600 border-t border-x border-stone-300 flex items-center justify-center h-10 lg:h-16 relative">
              <span className="text-white text-base lg:text-xl font-bold">TV 단독</span>
            </div>
            
            {/* 상품 영역 */}
            <div className="grid grid-cols-3 border border-stone-300">
              {[{t:"ALL TV", d:"242 채널", s:"기본형"},{t:"포인트 TV", d:"242 채널", s:"부가서비스 8종 중 택1"},{t:"초이스 TV", d:"242 채널", s:"부가서비스 9종 중 택1"}].map((v, i) => (
                <div key={i} className={`flex flex-col items-center justify-center bg-white py-5 gap-1 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-blue-600 text-xl lg:text-3xl font-extrabold tracking-tight">{v.t}</span>
                  <span className="text-black text-sm lg:text-lg font-bold">{v.d}</span>
                  <span className="text-stone-500 text-xs lg:text-sm font-medium">{v.s}</span>
                </div>
              ))}
            </div>
            
            {/* 요금 영역 */}
            <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
              {["13,200원", "15,400원", "19,800원"].map((p, i) => (
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

      {/* TV만 단독으로 설치하고 싶다면! 스카이라이프! */}
      <section className="container py-6 lg:py-10 text-center">
        <div className="text-blue-600 text-3xl lg:text-5xl font-extrabold tracking-tight">
          TV만 단독으로 설치하고 싶다면! 스카이라이프!
        </div>
      </section>

      {/* 알뜰 홈결합 요금제 */}
      <section className="container py-10 lg:py-16">
        <div className="text-black text-2xl lg:text-3xl font-bold mb-6">
          알뜰 홈결합 요금제
        </div>

        <div className="w-full overflow-x-auto lg:my-6 my-4">
          <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
            <div className="bg-blue-600 flex items-center justify-center h-10 lg:h-16 relative">
              <span className="text-white text-base lg:text-xl font-bold">
                인터넷 + WIFI + ALL TV <span className="bg-[#FFD93D] text-black px-2 py-0.5 rounded-md ml-2 text-sm font-semibold">(기본형 242채널)</span>
              </span>
            </div>
            <div className="grid grid-cols-2 border border-stone-300">
              {[
                {t: "100Mbps + ALL TV", d: "광랜 인터넷", s: "기본형 TV"},
                {t: "200Mbps + 베이직 TV", d: "실속형 인터넷", s: "기본형 TV"}
              ].map((item, i) => (
                <div key={i} className={`flex flex-col items-center justify-center bg-white py-5 gap-1 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-blue-600 text-lg lg:text-xl font-extrabold">{item.t}</span>
                  <span className="text-black text-sm lg:text-base font-bold">{item.d}</span>
                  <span className="text-stone-500 text-xs lg:text-sm font-medium">{item.s}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 border border-stone-300 !border-t-0">
              {["22,000원", "23,100원"].map((p, i) => (
                <div key={i} className={`flex items-center justify-center bg-white py-4 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                  <span className="text-black font-bold text-lg">월 {p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 저렴한 알뜰요금제를 쓰려고 하신다면, 200M 속도가 완전 가성비! */}
      <section className="container py-6 lg:py-10 text-center">
        <div className="text-blue-600 text-3xl lg:text-5xl font-extrabold tracking-tight leading-snug">
          저렴한 알뜰요금제를 쓰려고 하신다면, 200M 속도가<br />완전 가성비!
        </div>
      </section>

      {/* 일반 요금제 */}
      <section className="container py-10 lg:py-20 space-y-10">
        <div className="text-black text-2xl lg:text-3xl font-bold mb-6">
          일반 요금제
        </div>

        {/* 일반 요금제 TV 결합 상품 반복 구간 */}
        {[
          {title: "인터넷 + WIFI + ALL TV", sub: "실속형 242채널", items: ["100Mbps + ALL TV","200Mbps + ALL TV","500Mbps + ALL TV"], desc: ["광랜 인터넷", "실속형 인터넷", "기가라이트 인터넷"], subDesc: ["기본형 TV", "기본형 TV", "기본형 TV"], prices: ["30,800원","31,900원","37,400원"]},
          {title: "인터넷 + WIFI + 포인트 TV", sub: "선택형 242채널", items: ["100Mbps + 포인트 TV","200Mbps + 포인트 TV","500Mbps + 포인트 TV"], desc: ["광랜 인터넷", "실속형 인터넷", "기가라이트 인터넷"], subDesc: ["선택형 TV", "선택형 TV", "선택형 TV"], prices: ["33,000원","34,100원","39,600원"]},
          {title: "인터넷 + WIFI + 초이스 TV", sub: "선택형 242채널", items: ["100Mbps + 초이스 TV","200Mbps + 초이스 TV","500Mbps + 초이스 TV"], desc: ["광랜 인터넷", "실속형 인터넷", "기가라이트 인터넷"], subDesc: ["선택형 TV", "선택형 TV", "선택형 TV"], prices: ["38,500원","39,600원","45,100원"]}
        ].map((tv, idx) => (
          <div key={idx} className="w-full overflow-x-auto lg:my-10 my-6">
            <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)]">
              <div className="bg-blue-600 flex items-center justify-center h-10 lg:h-16 relative">
                <span className="text-white text-base lg:text-xl font-bold">
                  {tv.title} <span className="bg-[#FFD93D] text-black px-2 py-0.5 rounded-md ml-2 text-sm font-semibold">({tv.sub})</span>
                </span>
              </div>
              <div className="grid grid-cols-3 border border-stone-300">
                {tv.items.map((it, i) => (
                  <div key={i} className={`flex flex-col items-center justify-center bg-white py-5 gap-1 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                    <span className="text-blue-600 text-lg lg:text-xl font-extrabold">{it}</span>
                    <span className="text-black text-sm lg:text-base font-bold">{tv.desc[i]}</span>
                    <span className="text-stone-500 text-xs lg:text-sm font-medium">{tv.subDesc[i]}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 border border-stone-300 !border-t-0">
                {tv.prices.map((p, i) => (
                  <div key={i} className={`flex items-center justify-center bg-white py-4 ${i!==0 ? 'border-l border-stone-300' : ''}`}>
                    <span className="text-black font-bold text-lg">월 {p}</span>
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
          <div className="inline-flex items-center bg-amber-300 text-stone-900 px-3 py-1 rounded-full text-sm font-extrabold w-max tracking-wide uppercase shadow-sm">
            POINT 03
          </div>
          
          {/* 메인 헤드 */}
          <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
            인터넷 비용 절약 TIP !
          </div>
        </div>
          
        {/* 첫 번째, 결합할인 */}
        <div className="flex flex-col items-center justify-center gap-4 text-center pb-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl lg:text-5xl">📦</span>
            <div className="text-blue-600 text-3xl lg:text-5xl font-extrabold tracking-tight">첫 번째, 결합할인!</div>
          </div>
          <div className="text-blue-600 text-lg lg:text-xl font-bold leading-relaxed">
            스카이라이프는 애초에 알뜰 요금제로 가입 가능!<br />
            다만 현금사은품 금액에 차이가 있습니다~!
          </div>
        </div>

       {/* 두 번째, 제휴카드 할인 */}
      <div className="flex items-center justify-center gap-2 text-center pt-10 pb-6">
        <span className="text-3xl lg:text-5xl">💳</span>
        <div className="text-blue-600 text-3xl lg:text-5xl font-extrabold tracking-tight">두 번째, 제휴카드 할인!</div>
      </div>

      {/* 위쪽 컨텐츠들과 width 및 패딩을 완벽히 맞춘 컨테이너 */}
      <div className="w-full max-w-[1100px] mx-auto mb-10">
        <div className="overflow-x-auto shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] rounded-[10px] border border-stone-300 bg-white">
          {/* 핵심 수정: 모바일에서는 가로 스크롤이 되도록 고정 너비 설정 */}
          <div className="min-w-[767px]">
            {/* 테이블 헤더 */}
            <div className="bg-blue-600 grid grid-cols-[150px,1fr,1fr] py-4 text-white font-bold text-center text-sm lg:text-lg rounded-t-[10px]">
              <span>카드사</span>
              <span>카드명</span>
              <span>할인 혜택</span>
            </div>

            {/* 테이블 바디 */}
            {[
              { company: "하나카드", cards: ["스카이라이프X하나카드"], benefit: ["30만원 이상 실적 13,000원 할인"] },
              { company: "국민카드", cards: ["KB국민 알뜰폰 Hub"], benefit: ["30만원~70만원 미만 실적 13,000원 할인"] }
            ].map((item, i) => (
              <div key={i} className="grid grid-cols-[150px,1fr,1fr] border-t border-stone-300 text-center font-medium text-sm lg:text-base items-stretch last:rounded-b-[10px]">
                
                {/* 카드사 영역 (고정 너비) */}
                <div className="border-r border-stone-300 font-bold flex items-center justify-center p-4 bg-stone-50 h-full">
                  {item.company}
                </div>

                {/* 카드명 영역 */}
                <div className="border-r border-stone-300 font-bold text-blue-600 flex items-center justify-center p-4 px-1 h-full">
                  {item.cards[0]}
                </div>

                {/* 할인 혜택 영역 */}
                <div className="flex items-center justify-center font-bold text-stone-600 p-4 px-1 h-full">
                  {item.benefit[0]}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

        <p className="text-stone-500 lg:text-3xl text-xl text-center !leading-[1.5] lg:pt-10 pt-6">
          아니 안그래도 싼데 제휴카드할인까지 받으면 대체 얼마에 이용이 가능한거야?<br />
          <span className="text-blue-600 font-bold">저렴한 요금제를 찾으신다면 스카이라이프 완전 추천!</span>
        </p>
      </section>
    </div>
  );
}