var path = require('path')
var webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/main.app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  node: {
  fs: 'empty',
  child_process: 'empty'
  },
  externals: [
    'canvas'
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
            test: /\.proto$/,
            use: {
              loader: 'protobufjs-loader',
              options: {
                /* controls the "target" flag to pbjs - true for
                 * json-module, false for static-module.
                 * default: false
                 */
                json: true,
                
                /* import paths provided to pbjs.
                 * default: webpack import paths (i.e. config.resolve.modules)
                 */
                paths: ['/src/protocol'],
                
                /* additional command line arguments passed to
                 * pbjs, see https://github.com/dcodeIO/ProtoBuf.js/#pbjs-for-javascript
                 * for a list of what's available.
                 * default: []
                 */
                pbjsArgs: ['--no-encode']
              }
            }
        }
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      jquery: "jquery/src/jquery",
      'TRXWalletConfig': path.resolve(__dirname, 'config', process.env.NODE_ENV)
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    port:7070,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    open: false
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
