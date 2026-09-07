import React, { useState } from "react";

export default function SkPlan() {
  // 처음에는 인터넷과 TV 모두 아무것도 선택되지 않도록 빈 값("")으로 설정
  const [selectedInternet, setSelectedInternet] = useState("");
  const [selectedTv, setSelectedTv] = useState("");

  // 인터넷 상품 데이터
  const internetOptions = [
    { id: "100m", title: "100Mbps", type: "광랜 인터넷", desc: "1~2인 가구 추천", price: 23100 },
    { id: "500m", title: "500Mbps", type: "기가라이트 인터넷", desc: "3~4인 가구 추천", price: 34100 },
    { id: "1g", title: "1Gbps", type: "기가 인터넷", desc: "방송 송출 및 전문작업용", price: 39600 },
  ];

  // TV 상품 데이터
  const tvOptions = [
    { id: "economy", title: "이코노미", channel: "183채널", desc: "경제적인 금액대의 TV", price: 13200 },
    { id: "standard", title: "스탠다드", channel: "236채널", desc: "실속형 TV", price: 16500 },
    { id: "all", title: "ALL", channel: "257채널", desc: "최다 채널 TV", price: 19800 },
  ];

  // 선택된 인터넷 가격 (선택 안 되었으면 0원)
  const currentInternetPrice = internetOptions.find(i => i.id === selectedInternet)?.price || 0;
  
  // 선택된 TV 가격 (선택 안 되었으면 0원)
  const currentTvPrice = tvOptions.find(t => t.id === selectedTv)?.price || 0;
  
  // 총 예상 요금 (인터넷 + TV 합계, 둘 다 안 골랐으면 0원)
  const totalEstimatedPrice = currentInternetPrice + currentTvPrice;

  return (
    <div>
      <section className="container benefit">
        <div className="flex flex-col gap-2 mb-12">
          <div className="text-stone-500 text-sm font-semibold tracking-widest uppercase">
            SK Broadband
          </div>
          <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
            SK 요금제 안내
          </div>
          <div className="w-16 h-1 bg-[#0f382b] mt-2 mb-4"></div>
          <div className="text-stone-600 text-lg lg:text-xl font-medium">
            귀하의 라이프스타일에 최적화된 통신 요금을 선택하세요.
          </div>
        </div>

        {/* 1. 인터넷 - SK 전용 상품 선택 섹션 */}
        <div className="mb-10">
          <div className="text-black text-xl lg:text-2xl font-bold mb-4">인터넷 - SK 전용 상품</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {internetOptions.map((net) => {
              const isSelected = selectedInternet === net.id;
              return (
                <div
                  key={net.id}
                  onClick={() => {
                    setSelectedInternet(isSelected ? "" : net.id);
                  }}
                  className={`cursor-pointer flex flex-col justify-between p-6 rounded-[14px] border-2 transition-all bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] ${
                    isSelected ? "border-[#0f382b] ring-2 ring-[#0f382b]/20 bg-[#eef4f1]/50" : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div>
                    <div className="text-[#0f382b] text-sm font-bold">{net.type}</div>
                    <div className="text-black text-xl lg:text-2xl font-extrabold mt-1">{net.title}</div>
                    <div className="text-stone-500 text-sm font-medium mt-1">{net.desc}</div>
                  </div>
                  <div className="text-[#0f382b] text-lg lg:text-xl font-extrabold mt-6">
                    월 {net.price.toLocaleString()}원
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. TV 선택 섹션 (기본 선택 없음) */}
        <div className="mb-10">
          <div className="text-black text-xl lg:text-2xl font-bold mb-4">TV (선택사항)</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tvOptions.map((tv) => {
              const isSelected = selectedTv === tv.id;
              return (
                <div
                  key={tv.id}
                  onClick={() => {
                    setSelectedTv(isSelected ? "" : tv.id);
                  }}
                  className={`cursor-pointer flex flex-col justify-between p-6 rounded-[14px] border-2 transition-all bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] ${
                    isSelected ? "border-[#0f382b] ring-2 ring-[#0f382b]/20 bg-[#eef4f1]/50" : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <div>
                    <div className="text-[#0f382b] text-sm font-bold">{tv.title}</div>
                    <div className="text-black text-xl lg:text-2xl font-extrabold mt-1">{tv.channel}</div>
                    <div className="text-stone-500 text-sm font-medium mt-1">{tv.desc}</div>
                  </div>
                  <div className="text-[#0f382b] text-lg lg:text-xl font-extrabold mt-6">
                    월 {tv.price.toLocaleString()}원
                  </div>
                </div>
              );
            })}
          </div>
          {selectedTv !== "" && (
            <div className="text-center mt-3">
              <button 
                onClick={() => setSelectedTv("")}
                className="text-xs text-stone-500 underline hover:text-red-500"
              >
                TV 선택 해제하기
              </button>
            </div>
          )}
        </div>

        {/* 하단 예상 금액 결과 박스 (그린 톤 적용) */}
        <div className="bg-[#0f382b] rounded-[14px] p-6 lg:p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg my-8">
          <div className="mb-4 md:mb-0">
            <div className="text-lg lg:text-xl font-bold">매월 납부하실 예상 금액</div>
            <div className="text-emerald-100 text-xs lg:text-sm mt-1">
              {selectedInternet === "" && selectedTv === "" 
                ? "인터넷 또는 TV 상품을 선택하시면 합산 금액이 표시됩니다." 
                : `${selectedInternet ? internetOptions.find(i => i.id === selectedInternet)?.title : "인터넷 미선택"} ${selectedTv ? `+ ${tvOptions.find(t => t.id === selectedTv)?.title} TV` : ""} 요금 합계입니다.`}
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm lg:text-base font-medium mr-2">예상 월 요금:</span>
            <span className="text-3xl lg:text-4xl font-extrabold text-[#FFD93D]">
              {totalEstimatedPrice.toLocaleString()}원
            </span>
            <div className="text-emerald-100 text-xs mt-1">3년 약정 기준 / VAT 포함</div>
          </div>
        </div>
      </section>

      {/* 지원금 및 할인 정보 섹션 */}
      <section className="container py-10 lg:py-20">
        <div className="flex items-center justify-center gap-2 text-center pb-8">
          <span className="text-3xl lg:text-5xl">🎁</span>
          <div className="text-[#0f382b] text-3xl lg:text-5xl font-extrabold tracking-tight">인터넷 단독 최대 지원금 47만원!</div>
        </div>
      </section>

      {/* 결합 할인 및 제휴 카드 섹션 */}
      <section className="container py-10 lg:py-20 space-y-10">
        <div className="flex flex-col gap-2 mb-12">
          <div className="text-[#0f382b] text-sm font-semibold tracking-widest uppercase">
            Saving Guide
          </div>
          <div className="text-black text-4xl lg:text-5xl font-extrabold tracking-tight">
            인터넷 비용 절약 TIP
          </div>
          <div className="w-16 h-1 bg-[#0f382b] mt-2 mb-4"></div>
          <div className="text-stone-600 text-lg lg:text-xl font-medium">
            결합 할인과 제휴 카드로 매월 고정비를 획기적으로 줄여보세요.
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-center pb-6">
          <span className="text-3xl lg:text-5xl">🤝</span>
          <div className="text-[#0f382b] text-3xl lg:text-5xl font-extrabold tracking-tight">첫 번째, 결합할인!</div>
        </div>
        
        <div className="w-full overflow-x-auto">
          <div className="min-w-[767px] mx-auto rounded-[10px] overflow-hidden shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] border border-stone-300">
            <div className="bg-[#0f382b] grid grid-cols-4 py-4 text-white font-bold text-center text-sm lg:text-lg">
              <span>결합 종류</span><span>결합 조건</span><span>인터넷 할인</span><span>휴대폰 할인</span>
            </div>
            
            <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium">
              <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-[#0f382b]">온 가족할인</div>
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

            <div className="grid grid-cols-4 border-t border-stone-300 text-center text-sm lg:text-base font-medium bg-stone-50">
              <div className="flex items-center justify-center p-4 border-r border-stone-300 font-extrabold text-[#0f382b]">요즘 가족결합</div>
              <div className="p-4 border-r border-stone-300 flex items-center justify-center">
                휴대폰 1~5회선까지 결합 가능
              </div>
              <div className="p-4 border-r border-stone-300 space-y-1">
                <div className="font-bold">100M - 4,400원</div>
                <div className="font-bold">500M - 11,000원</div>
                <div className="font-bold">1G - 13,200원</div>
              </div>
              <div className="p-4 flex items-center justify-center font-extrabold text-[#0f382b]">
                최소 3,500 ~ 최대 24,000원
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-center pt-10 pb-6">
          <span className="text-3xl lg:text-5xl">💳</span>
          <div className="text-[#0f382b] text-3xl lg:text-5xl font-extrabold tracking-tight">두 번째, 제휴카드 할인!</div>
        </div>

        <div className="w-full max-w-[1100px] mx-auto mb-10">
          <div className="overflow-x-auto shadow-[0_4px_24px_0_rgba(0,0,0,0.08)] rounded-[10px] border border-stone-300">
            <div className="min-w-[767px]">
              <div className="bg-[#0f382b] grid grid-cols-3 py-4 text-white font-bold text-center text-sm lg:text-lg rounded-t-[10px]">
                <span>카드사</span><span>카드명</span><span>할인 혜택</span>
              </div>
              {[
                ["롯데카드", "SK브로드밴드 B롯데카드", "50만원 이상 실적 10,000원 할인"],
                ["삼성카드", "SK브로드밴드 삼성카드", "30만원 이상 실적 7,000원 할인"]
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-3 border-t border-stone-300 text-center py-5 font-medium text-sm lg:text-base last:rounded-b-[10px]">
                  <div className="border-r border-stone-300 font-bold">{row[0]}</div>
                  <div className="border-r border-stone-300 font-bold text-[#0f382b] px-1">{row[1]}</div>
                  <div className="font-bold px-1">{row[2]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-stone-500 lg:text-2xl text-lg text-center font-medium leading-relaxed pt-10">
          당장 받는 할인 금액이 크지 않아보여도<br />
          3년이라는 시간동안 받는 할인이라고 생각하면<br />
          <span className="text-[#0f382b] font-extrabold text-xl lg:text-3xl underline decoration-[#0f382b] underline-offset-4">무조건 받는게 이득</span>입니다!
        </p>
      </section>
    </div>
  );
}