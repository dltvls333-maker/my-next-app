'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Session } from "next-auth"; // 타입 가져오기



export default function ReviewDetailContent({ review }: { review: any }) {
  const router = useRouter();
    const handleDelete = async () => {
    // 사용자가 삭제를 원치 않을 수도 있으니 확인 창을 띄우는 것이 좋습니다.
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      const res = await fetch(`/api/reviews/${review.id}`, { // 리뷰 id를 포함한 API 경로
        method: "DELETE",
      });

      if (res.ok) {
        alert("삭제되었습니다.");
        // 삭제 후 목록 페이지로 이동하거나 페이지를 새로고침합니다.
        window.location.href = "/reviews"; 
      } else {
        alert("삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("오류가 발생했습니다.");
    }
  };
  // 로그인이 되어 있고, 레벨이 9인 경우에만 관리자 판단
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const { data: session } = useSession() as { data: Session | null };

  // 이제 session.user.level에 접근해도 빨간 줄이 뜨지 않습니다.
  const isAdmin = session?.user?.level === 9;
  const handleVerify = async () => {
    const res = await fetch('/api/reviews/verify', {
      method: 'POST',
      body: JSON.stringify({ id: review.id, password }),
    });

    if (res.ok) {
      // 요청하신 대로 write 경로로 이동합니다.
      router.push(`/reviews/edit?id=${review.id}`); 
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <main className="min-h-screen bg-white py-16 px-4">
      <div className="mx-auto max-w-[1240px]">
        {/* 요청하신 디자인을 그대로 유지했습니다 */}
        <div className="border-b-2 border-slate-900 pb-8 mb-8">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full mb-4">
            {review.category}
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            {review.title}
          </h1>
          <div className="flex items-center gap-4 mt-6 text-slate-500 text-sm">
            <span className="font-bold text-slate-900">{review.user_name}</span>
            <span>|</span>
            <span>{new Date(review.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {review.image_url && (
          <div className="my-8 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex justify-center items-center">
            <img src={review.image_url} alt="후기 이미지" className="w-full max-h-[500px] object-contain rounded-xl" />
          </div>
        )}
   
        <div className="py-8 min-h-[300px] text-lg text-slate-800 leading-relaxed whitespace-pre-line">
          {review.content}
        </div>

        <div className="flex justify-between items-center pt-12 border-t border-slate-100">
          <Link href="/reviews" className="px-8 py-3 bg-slate-100 font-bold text-slate-700 rounded-lg hover:bg-slate-200 transition">
            목록으로
          </Link>
          <div className="flex gap-3">
            <button 
              onClick={() => {
                // 관리자면 바로 수정 페이지로, 아니면 비밀번호 검증 모달 오픈
                if (isAdmin) {
                  router.push(`/reviews/edit?id=${review.id}`); 
                } else {
                  setShowModal(true);
                }
              }} 
              className="px-8 py-3 border border-slate-300 font-bold text-slate-700 rounded-lg hover:border-slate-900 transition"
            >
              수정
            </button>
            {isAdmin && (
              <button onClick={handleDelete} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-700 transition">
                삭제
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 모달 디자인은 기존 스타일을 해치지 않는 범위에서 추가했습니다 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl w-96 shadow-xl">
            <h3 className="font-bold text-lg mb-4">비밀번호 확인</h3>
            <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full border p-3 rounded-lg mb-4" />
            <div className="flex gap-2">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2 bg-slate-100 rounded-lg">취소</button>
              <button onClick={handleVerify} className="flex-1 py-2 bg-slate-900 text-white rounded-lg">확인</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}