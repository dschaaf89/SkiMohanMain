const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Only require and add the plugin in development mode
    if (dev) {
      const EnforceDevtoolPlugin = require('./enforceDevToolPlugin');
      config.plugins.push(new EnforceDevtoolPlugin());
    }

    if (!dev) {
      config.devtool = isServer ? false : 'cheap-module-source-map';
    }

    config.module.rules.push({
      test: /\.js\.map$/,
      loader: 'ignore-loader',
    });

    // Log the devtool setting
    console.log('Webpack Devtool:', config.devtool);

    return config;
  },
};

module.exports = nextConfig;
