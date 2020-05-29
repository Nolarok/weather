const withSass = require('@zeit/next-sass')
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const withImages = require('next-images')

module.exports = withSass(withImages({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]--[hash:base64:5]',
  },
  webpack: config => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin())
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()]
    }

    config.module.rules.push({
      test: /\.(webp|woff|ttf|woff2?)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: '[path][name]-[hash:8].[ext]',
          },
        },
      ],
    })
    return config
  },
}))
