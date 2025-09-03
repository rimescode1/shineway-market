/** @type {import('next').NextConfig} */
const nextConfig = {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "www.shineway.health",
    },
    {
      protocol: "https",
      hostname: "flagsapi.com",
    },

    {
      protocol: "https",
      hostname: "img.freepik.com",
    },
  ],
};

export default nextConfig;
