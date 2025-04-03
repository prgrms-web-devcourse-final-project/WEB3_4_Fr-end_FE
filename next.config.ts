/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // 빌드 중 ESLint 오류 무시
    ignoreDuringBuilds: true,
  },
};
