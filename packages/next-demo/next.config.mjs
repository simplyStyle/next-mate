import bundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin';
import { env } from './src/config/env.cjs';

const plugins = [];

plugins.push(
  withNextIntl('./src/i18n.ts'),
  bundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  })
);

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config;
}

/**
 * Dynamic configuration available for the browser and server.
 * Note: requires `ssr: true` or a `getInitialProps` in `_app.tsx`
 * @link https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
 */
export const publicRuntimeConfig = {
  NODE_ENV: env.NODE_ENV,
};

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 * @type {import("next").NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  publicRuntimeConfig,
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  transpilePackages: ['@hyperse-io/next-trpc'],
};

export default getConfig(
  plugins.reduce((config, plugin) => plugin(config), config)
);
