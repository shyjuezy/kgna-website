import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        // Images uploaded through the admin's Cloudinary widget.
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  async redirects() {
    return [
      // /directory was renamed to /sponsors; keep the old URL working for
      // anything already linking to or indexing it.
      {
        source: "/directory",
        destination: "/sponsors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
