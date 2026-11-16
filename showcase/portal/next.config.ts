import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
  transpilePackages: ["@forge-ui/web"],
};
export default nextConfig;
