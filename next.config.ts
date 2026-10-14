import type { NextConfig } from "next";

const isProd = process.env.NEXT_PUBLIC_DEPLOY_TARGET === "prod";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/portfolio" : "",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   cacheComponents: true,
//   partialPrefetching: true,
//   turbopack: {
//     rules: {
//       "*.css": {
//         loaders: ["@tailwindcss/turbopack"],
//         as: "*.css",
//       },
//     },
//   },
//   output: "export",
//   basePath: "/dev-portfolio",
//   images: {
//     unoptimized: true,
//   },
// };

// export default nextConfig;
