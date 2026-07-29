import { prisma } from "@/lib/prisma";

export default async function Logo() {
  // DB에서 데이터 조회
  const settings = await prisma.siteSettings.findUnique({
    where: { id: 1 },
  });

  // DB에 데이터가 없거나 로딩 중일 때를 대비한 기본값 처리
  const logoPath = settings?.logo_path || "/images/logo.png";
  const logoAlt = settings?.logo_name || "로고";

  return (
    <a href="/" className="flex items-center">
      <img 
        src={logoPath} 
        alt={logoAlt} 
        className="h-10 md:h-12 w-auto object-contain" 
      />
    </a>
  );
}