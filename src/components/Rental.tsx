// components/CommonImage.tsx
import Image from 'next/image';
import Link from 'next/link';

interface CommonImageProps {
  pcSrc: string;
  mobileSrc: string;
  alt: string;
  priority?: boolean;
}

export default function CommonImage({
  pcSrc,
  mobileSrc,
  alt,
  priority = false,
}: CommonImageProps) {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <Link 
        href="https://xn--sm2bx2zod011b.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-full cursor-pointer"
      >
        {/* PC용 이미지 (모바일에서는 숨김) */}
        {/* TailwindCSS 기준: md:block 은 화면이 중간 크기(768px) 이상일 때 보임 */}
        {/* md:hidden 은 화면이 중간 크기 이상일 때 숨김 */}
        <div className="hidden md:block">
          <Image
            src={pcSrc}
            alt={alt}
            width={3840}
            height={750}
            priority={priority}
            style={{ width: '100%', height: 'auto', aspectRatio: '3840 / 750' }}
            unoptimized // 원본 화질 유지 원하시면 사용
          />
        </div>

        {/* 모바일용 이미지 (PC에서는 숨김) */}
        <div className="md:hidden">
          <Image
            src={mobileSrc}
            alt={`${alt} (모바일)`}
            width={750}   // 모바일 이미지의 대략적 가로
            height={270} // 모바일 이미지의 세로 비율 (예시: 세로형 배너라면 다르게 설정)
            priority={priority}
            style={{ width: '100%', height: 'auto', aspectRatio: '750 / 270' }} // 모바일 비율
            unoptimized // 원본 화질 유지 원하시면 사용
          />
        </div>
      </Link>
    </div>
  );
}