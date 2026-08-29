import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // 💡 1. Header
import Footer from "@/components/Footer"; // 💡 2. Footer
import ConsultationForm from '@/components/ConsultationForm';
import { Providers } from "./providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 타이틀과 한글 설명을 사이트에 맞게 수정했습니다.
export const metadata: Metadata = {
  title: "바로넷",
  description: "바로넷",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 한국어 검색엔진 수집을 위해 lang="en"을 lang="ko"로 변경했습니다.
    <html
      lang="ko" 
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        
        {/* 💡 2. body 태그 바로 아래에 헤더를 넣어 모든 페이지 상단에 고정합니다! */}
        <Header />
        
        {/* 각 페이지의 알맹이 내용들이 들어오는 자리입니다 */}
        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <Footer />
        <ConsultationForm />
      </body>
    </html>
  );
}