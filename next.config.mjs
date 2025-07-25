/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsHmrCache: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hjotckytpzoeovgmixkr.supabase.co",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/embed",
        headers: [
          {
            key: "Content Seciroty Policy",
            value: "frame-src 'self' https://vehiql-waitlist.created.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
