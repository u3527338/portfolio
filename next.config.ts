import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [new URL("https://res.cloudinary.com/daks9y7dv/**")],
    },
};

export default nextConfig;
