import { prisma } from '@/lib/prisma';
import ReviewClient from './ReviewClient';

export default async function ReviewPage() {
  // DB에서 데이터 전체 가져오기 (작성일 기준 내림차순)
  const reviews = await prisma.review.findMany({
    orderBy: { created_at: 'desc' },
  });

  // DB 데이터를 컴포넌트가 사용하기 좋은 형태로 가공
  const formattedReviews = reviews.map((r) => ({
    id: r.id,
    category: r.category || '인터넷',
    title: r.title,
    user_name: r.user_name || '익명',
    image_url: r.image_url,
    // 날짜 포맷팅 (DB의 created_at 사용)
    date: r.created_at ? new Date(r.created_at).toLocaleDateString() : '날짜 없음',
  }));

  return <ReviewClient initialReviews={formattedReviews} />;
}