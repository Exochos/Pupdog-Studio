import withBundleAnalyzer from "@next/bundle-analyzer"
import withPlugins from "next-compose-plugins"
import { env } from "./env.mjs"

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  images: {
    domains: ["deck206.com"],
    unoptimized: true,
  },
  reactStrictMode: true,
  //output: 'export',
  experimental: { instrumentationHook: true },
  // Remove rewrites as they are not supported in static export
})

export default config
