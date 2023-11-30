import bundleAnalyzer from '@next/bundle-analyzer';
import withNextIntl from 'next-intl/plugin';

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
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 * @type {import("next").NextConfig}
 */
const config = {
  reactStrictMode: true,
  experimental: {
    // typedRoutes: true,
    // Turbo seemingly supports HMR for JSON files, quite handy to handle i18n messages.
    serverActions: {
      allowedForwardedHosts: ['www.hyperse.net', 'localhost'],
      allowedOrigins: ['www.hyperse.net', 'localhost'],
    },
  },
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  transpilePackages: ['@hyperse-io/next-auth', '@hyperse-io/next-trpc'],
};

export default getConfig(
  plugins.reduce((config, plugin) => plugin(config), config)
);
