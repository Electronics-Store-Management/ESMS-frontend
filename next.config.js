/** @type {import('next').NextConfig} */
const nextConfig = {
    // pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
    images: {
        domains: ["esms-store.s3.amazonaws.com"],
    },
};

module.exports = nextConfig;
