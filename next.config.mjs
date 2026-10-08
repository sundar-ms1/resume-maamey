/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  // Flat output (editor.html, templates.html) + relative asset URLs, so the exported `out/`
  // folder works at any URL depth. In dev, real routes (/editor) are used instead.
  trailingSlash: false,
  assetPrefix: isProd ? '.' : undefined,
  env: { NEXT_PUBLIC_STATIC: isProd ? '1' : '0' },
  images: { unoptimized: true },
  reactStrictMode: true,
};
export default nextConfig;
