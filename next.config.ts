import type { NextConfig } from "next";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
let strapiHostname = "localhost";
let strapiProtocol: "http" | "https" = "http";
let strapiPort = "1337";

try {
  const parsedStrapiUrl = new URL(strapiUrl);
  strapiHostname = parsedStrapiUrl.hostname;
  strapiProtocol = parsedStrapiUrl.protocol === "https:" ? "https" : "http";
  strapiPort = parsedStrapiUrl.port;
} catch {
  strapiHostname = "localhost";
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
      {
        protocol: strapiProtocol,
        hostname: strapiHostname,
        port: strapiPort,
      },
    ],
  },
};

export default nextConfig;
