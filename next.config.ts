import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      // old dashboard URLs -> new role routes
      {
        source: '/dashboard/admin/:path*',
        destination: '/admin/:path*',
        permanent: false,
      },
      {
        source: '/dashboard/student/:path*',
        destination: '/student/:path*',
        permanent: false,
      },
      {
        source: '/dashboard/teacher/:path*',
        destination: '/faculty/:path*',
        permanent: false,
      },
      // the backend's bKash callback redirects here (APP_URL + /dashboard/enrolment/...)
      {
        source: '/dashboard/enrolment/success',
        destination: '/payment/success',
        permanent: false,
      },
      {
        source: '/dashboard/enrolment/failures',
        destination: '/payment/cancel?status=failure',
        permanent: false,
      },
      {
        source: '/dashboard/enrolment/cancel',
        destination: '/payment/cancel',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
