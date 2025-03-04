/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/seakunid_prod-bucket/**",
      },

    ],
  },
};

export default nextConfig;
