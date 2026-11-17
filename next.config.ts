import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the Turbopack workspace root to this project. Without it, Turbopack can
  // infer a parent folder and fail to resolve packages such as tailwindcss.
  turbopack: {
    root: path.resolve(__dirname),
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
};

export default nextConfig;
