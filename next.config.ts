/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // HTTP도 허용
        hostname: "**", // 모든 호스트 허용
        port: "",
        pathname: "/**", // 모든 경로 허용
      },
      {
        protocol: "https", // HTTPS도 허용
        hostname: "**", // 모든 호스트 허용
        pathname: "/**", // 모든 경로 허용
      },
    ],
  },
};
