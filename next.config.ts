import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    // link breve da dettare al telefono: webbang.it/sconto
    return [{ source: "/sconto", destination: "/richiedi-sconto", permanent: false }];
  },
};

export default nextConfig;
