/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["guu-nft-diploms.infura-ipfs.io", "infura-ipfs.io"],
  },
};

module.exports = nextConfig

// module.exports = {
//   reactStrictMode: true,
//   images: {
//     domains: ["guu-nft-diploms.infura-ipfs.io"],
//     formats: ["image/webp"],
//   },
// };

