import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReviewDetailContent from './ReviewDetailContent';
export default async function ReviewDetailPage({ params }: { params: { id: string } }) {
  // 사용자가 주신 잘 작동하는 로직 그대로 유지
  const id = Number((await params).id);
  if (isNaN(id)) return notFound();

  const review = await prisma.review.findFirst({
    where: { id: id },
  });

  if (!review) return notFound();
  return <ReviewDetailContent review={review} />;
  
}