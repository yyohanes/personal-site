const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const baseConfig = require('./webpack.config.base')

const serverConfigs = function (env, argv = {}) {
  const devMode = argv.mode === 'development'

  const envs = require('dotenv').config().parsed || {}
  // Filter only var prefixed with SERVER_
  const envKeys = Object.keys(envs).reduce((prev, next) => {
    if (/SERVER_/.test(next)) {
      prev[`process.env.${next}`] = JSON.stringify(envs[next]);
    }

    return prev;
  }, {});

  return merge(baseConfig(env, argv), {
    target: 'node',
    entry: './src/server',
    output: {
      path: path.resolve(__dirname, 'server'),
      filename: '[name].js',
      publicPath: '/',
    },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [
                  'dynamic-import-node',
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
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                onlyLocals: true,
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
                emitFile: false,
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
      new webpack.DefinePlugin({
        __IS_BROWSER__: JSON.stringify(false),
        __DEBUG__: devMode,
        ...envKeys,
      }),
    ],
  })
}

module.exports = serverConfigs
