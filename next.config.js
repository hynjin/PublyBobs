/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix:
        process.env.NODE_ENV === 'production'
            ? 'http://hynjin.github.io/PublyBobs'
            : '',
    reactStrictMode: true,
};

module.exports = nextConfig;
