export enum DeployTarget {
  LOCAL = "local",
  PROD = "prod",
}

const target =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === DeployTarget.PROD
    ? DeployTarget.PROD
    : DeployTarget.LOCAL;

export const Environment = {
  target,

  isProd: target === DeployTarget.PROD,
  isLocal: target === DeployTarget.LOCAL,

  basePath: target === DeployTarget.PROD ? "/portfolio" : "",
} as const;