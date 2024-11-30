const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback, // Preserve existing fallbacks
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert/'),
    url: require.resolve('url/'),
    process: require.resolve('process/browser'), // Add process fallback
    buffer: require.resolve('buffer/'),         // Ensure buffer is included
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',               // Provide process globally
      Buffer: ['buffer', 'Buffer'],            // Provide Buffer globally
    }),
  ]);

  return config;
};
