/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "esms-store.s3.amazonaws.com",
            },
        ],
    },
};

module.exports = nextConfig;
