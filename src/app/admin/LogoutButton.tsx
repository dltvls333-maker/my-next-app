"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="px-6 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-semibold"
    >
      로그아웃
    </button>
  );
}