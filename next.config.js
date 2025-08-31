// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig
// next.config.js


/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push(
        "snappy",
        "kerberos",
        "mongodb-client-encryption",
        "@mongodb-js/zstd"
      );
    }
    return config;
  },
};

module.exports = nextConfig;


