import type { NextConfig } from "next";
import { Environment } from "./config/environment";

const nextConfig: NextConfig = {
  output: "export",
  basePath: Environment.basePath,
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
