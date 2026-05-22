// const path = require("path");
// const dotenv = require("dotenv");

// const nextConfig = {
//   async rewrites() {
//     return {
//       afterFiles: i18nRewriter(i18nConfig),
//     };
//   },
// };

// const envPath =
//   process.env.NODE_ENV === "production"
//     ? path.resolve(process.cwd(), "environment/.env.production")
//     : path.resolve(process.cwd(), "environment/.env.development");

// const env = dotenv.config({ path: envPath }).parsed;

// module.exports = {
//   webpack(config) {
//     return {
//       ...config,
//     };
//   },
//   env,

//   nextConfig,
//   experimental: {
//     appDir: true,
//     serverActions: true,
//   },

//   eslint: {
//     ignoreDuringBuilds: true,
//   },
// };


const path = require("path");
const dotenv = require("dotenv");

const envPath =
  process.env.NODE_ENV === "production"
    ? path.resolve(process.cwd(), "environment/.env.production")
    : path.resolve(process.cwd(), "environment/.env.development");

const env = dotenv.config({ path: envPath }).parsed;

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "api.dochyve.com",
        pathname: "/api/storage/**",
      },
      {
        protocol: "https",
        hostname: "api.dochyve.com",
        pathname: "/api/storage/**",
      },
    ],
  },
  env,
  experimental: {
    appDir: true,
    serverActions: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    return config;
  },
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
      {
        source: '/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
