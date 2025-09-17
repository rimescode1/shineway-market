/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shineway.health",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagsapi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
