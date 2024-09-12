/** @type {import('next').NextConfig} */
const nextConfig = {
  
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp4)$/,
      experimental: {
        appDir: true,
      },
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
