const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')

function baseConfig (env, argv = {}) {
  const devMode = argv.mode === 'development'

  const base = {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
      alias: {
        app: path.resolve(__dirname, 'src'),
        ['package.json']: path.resolve(__dirname, 'package.json'),
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new LoadablePlugin(),
    ],
  }

  if (devMode) {
    base.devtool = 'cheap-module-eval-source-map'
  }

  return base
}

module.exports = baseConfig
