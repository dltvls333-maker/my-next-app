// src/app/page.tsx
import { prisma } from '@/lib/prisma';
import BannerSlider from '@/components/BannerSlider';
import RollingBanner from '@/components/RollingBanner';
import CompanyIntro from '@/components/CompanyIntro';
import ResponsiveImage from '@/components/ResponsiveImage';
import CertificateSection from '@/components/CertificateSection';
import ApplianceSlider from '@/components/ApplianceSlider';
import ReviewSlider from '@/components/ReviewSlider';
import CommonImage from '@/components/Rental';
export default async function HomePage() {
  const data = await prisma.review.findMany({
    // take: 20, 
    orderBy: { created_at: 'desc' },
  });
  console.log(data)
  const reviews = data.map(r => ({
    ...r,
    date: r.created_at.toLocaleDateString(),
  }));
  // select를 사용하면 Prisma가 날짜 필드(에러의 주범)를 아예 DB에서 가져오지 않습니다.
  const banners = await prisma.banners.findMany({
    where: { is_active: true },
    orderBy: { sort_order: 'asc' },
    select: {
      id: true,
      title: true,
      subtitle: true,
      image_url: true,
      link_url: true,
      sort_order: true,
      is_active: true,
      // created_at, updated_at을 호출하지 않으므로 에러가 날 이유가 없습니다!
    }
  });

  return (
    <main className="w-full flex-grow">
      {banners.length > 0 ? (
        <BannerSlider banners={banners} />
      ) : (
        <div className="p-10 text-center">표시할 배너가 없습니다.</div>
      )}

      {/* 1. 입금 사례 배너는 여기서만 호출 */}
      <RollingBanner />
      <CompanyIntro />
      <ResponsiveImage />
      <CertificateSection />
      <ApplianceSlider />
      <ReviewSlider reviews={reviews} />
      <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <CommonImage
          pcSrc="/layout_img/rental.png"
          mobileSrc="/layout_img/M_rental.png"
          alt="렌탈 서비스 배너"
          priority={true}
        />
      </div>
    </main>
  );
}