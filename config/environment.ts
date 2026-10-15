const normalize = (path: string) => {
  const trimmed = path.trim().replace(/^\/+|\/+$/g, "");
  return trimmed ? `/${trimmed}` : "";
};

export const basePath = normalize(process.env.NEXT_PUBLIC_BASE_PATH ?? "");

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

export const withBase = (path: string) =>
  `${basePath}${path.startsWith("/") ? path : `/${path}`}`;
