var
  _ = require('lodash'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  helpers = require('./helpers'),
  packageConf = require('./package.json')
  runtimeDependencies = _.keys(_.get(packageConf, 'dependencies'));
webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

var options = {
  entry: {
    vendor: [ './src/vendor.ts'].concat(runtimeDependencies),
    main: './src/main.ts',
    app: './src/app.ts'
  },
  output: {
    path: './app',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  target: 'electron',
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      },
      {
        test: /\.ts$/,
        loaders: ['babel-loader?presets[]=es2015', 'awesome-typescript-loader']
      },
      {
        test: /\.html$/,
        loaders: ['html?caseSensitive']
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loaders: [ExtractTextPlugin.extract('style', 'css?sourceMap')]
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loaders: ['raw']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loaders: ['file?name=assets/[name].[hash].[ext]']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },
  plugins: [
    /*
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'app', 'vendor']
    }),
    */
    new webpack.NodeEnvironmentPlugin(),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ],
}

// options.target = webpackTargetElectronRenderer(options);
module.exports = options;
