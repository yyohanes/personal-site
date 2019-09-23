const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

const clientConfigs = function (env, argv = {}) {
  const devMode = argv.mode === 'development'

  return merge(baseConfig(env, argv), {
    entry: './src/browser',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: devMode ? '[name].js' : '[name].[hash].js',
      chunkFilename: devMode ? '[id].js' : '[id].[hash].js',
      publicPath: '/public/',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  'syntax-dynamic-import',
                  '@loadable/babel-plugin',
                  [
                    '@babel/plugin-transform-runtime',
                    {
                      helpers: false,
                      regenerator: true,
                    },
                  ],
                ],
                presets: [
                  '@babel/react',
                  [
                    '@babel/preset-env',
                    {
                      modules: false,
                    },
                  ],
                ],
              },
            },
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode,
              },
            },
            {
              loader: 'css-loader',
              options: {
                // TODO: CSS Modules
                modules: false,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: devMode,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|otf|svg|woff2?|png|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: devMode ? '[name].[ext]' : '[hash].[ext]',
                outputPath: 'assets',
                publicPath: '/public/assets/',
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      new webpack.DefinePlugin({
        __IS_BROWSER__: JSON.stringify(true),
        __DEBUG__: devMode,
      }),
    ],
    optimization: {
      splitChunks: {
        automaticNameDelimiter: '.',
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace('@', '')}`;
            },
          },
          default: {
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      },
      runtimeChunk: {
        name: entrypoint => `runtime.${entrypoint.name}`
      },
    },
  })
}

module.exports = clientConfigs
