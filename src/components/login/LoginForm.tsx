"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [userId, setUserId] = useState(""); // 변수명 변경
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      userId:userId,
      password,
      redirect: false,
    });

    if (res?.error) {
      alert("로그인 정보가 올바르지 않습니다.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F4F7FE]">
      <div className="w-full max-w-[560px] rounded-[40px] bg-white p-20 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Admin Page</h2>
          <p className="mt-4 text-lg text-gray-400">시스템 관리자 전용 접속 페이지</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Email</label>
            <input
              type="text"
              className="w-full rounded-2xl bg-gray-50 border-none p-6 text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Id"
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wider">Password</label>
            <input
              type="password"
              className="w-full rounded-2xl bg-gray-50 border-none p-6 text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button className="w-full mt-10 rounded-2xl bg-[#2563EB] p-6 text-xl text-white font-bold hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-200">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}