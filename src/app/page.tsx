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
  // 두 개의 DB 쿼리를 병렬(Promise.all)로 동시에 실행하여 로딩 속도와 타임아웃 위험을 대폭 줄입니다.
  const [data, banners] = await Promise.all([
    prisma.review.findMany({
      // take: 20, // 필요시 주석 해제하여 갯수 제한
      orderBy: { created_at: 'desc' },
    }),
    prisma.banners.findMany({
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
      }
    })
  ]);

  const reviews = data.map(r => ({
    ...r,
    date: r.created_at.toLocaleDateString(),
  }));

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
      {/* <div style={{ maxWidth: '100%', margin: '0 auto' }}>
        <CommonImage
          pcSrc="/layout_img/rental.png"
          mobileSrc="/layout_img/M_rental.png"
          alt="렌탈 서비스 배너"
          priority={true}
        />
      </div> */}
    </main>
  );
}