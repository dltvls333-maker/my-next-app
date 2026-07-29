// src/app/internet/page.tsx
import { redirect } from 'next/navigation';

export default function InternetPage() {
  // 리다이렉트 실행
  redirect('/internet/sk');
  
  // 만약 리다이렉트가 즉시 일어나지 않을 경우를 대비해 null을 반환
  return null;
}