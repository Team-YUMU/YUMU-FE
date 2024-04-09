const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['yumu-image.s3.ap-northeast-2.amazonaws.com/', 'yu-mu.vercel.app/'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ymkimstorage.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      //landing 현재 라이브 경매 이미지
      {
        protocol: 'https',
        hostname: 'yumu-image.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  redirects: async () => [
    {
      source: '/api/v1/:path*',
      destination: 'http://3.34.229.242:8080/api/v1/:path*',
      permanent: false,
    },
  ],
};

export default nextConfig;
