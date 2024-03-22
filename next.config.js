const nextConfig = {
  images: {
    domains: ['cdn.weatherapi.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Ignore .js.map files
    config.module.rules.push({
      test: /\.js\.map$/,
      loader: 'ignore-loader'
    });

    // Important: return the modified config
    return config; 
  },
}

module.exports = nextConfig;
