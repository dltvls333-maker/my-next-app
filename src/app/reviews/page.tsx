import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import ReviewClient from './ReviewClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReviewPage() {
  headers(); // Vercel 캐싱 방지 및 동적 서버 요청 강제

  // DB에서 데이터 전체 가져오기 (작성일 기준 내림차순)
// page.tsx 수정
const reviews = await prisma.review.findMany({
  orderBy: { id: 'desc' }, // created_at 대신 id 기준 내림차순
});

  // DB 데이터를 컴포넌트가 사용하기 좋은 형태로 가공
  const formattedReviews = reviews.map((r) => ({
    id: r.id,
    category: r.category || '인터넷',
    title: r.title,
    user_name: r.user_name || '익명',
    image_url: r.image_url,
    date: r.created_at ? new Date(r.created_at).toLocaleDateString() : '날짜 없음',
  }));

  return <ReviewClient initialReviews={formattedReviews} />;
}