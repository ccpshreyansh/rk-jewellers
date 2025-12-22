import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
images: {
  domains: [
    "localhost",
    "ceullkuvmxvkhwpjayfp.supabase.co",
    "lh3.googleusercontent.com",
    "service-reviews-ultimate.elfsight.com",
  ],
},

};

export default nextConfig;
