import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos', // 💡 전 세계 개발자들이 가장 많이 쓰는 더미 이미지 도메인 추가
        port: '',
        pathname: '/**',
      },
      
    ],
  },
    // 💡 추가된 서버 액션 용량 제한 설정
    experimental: {
      serverActions: {
        bodySizeLimit: '5mb',
      },
    },
};

export default nextConfig;