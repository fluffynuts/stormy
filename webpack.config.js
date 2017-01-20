var
  _ = require('lodash'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  helpers = require('./helpers'),
  packageConf = require('./package.json')
runtimeDependencies = _.keys(_.get(packageConf, 'dependencies')),
  target = process.env.TARGET || 'electron';

if (target === 'web') {
  runtimeDependencies = runtimeDependencies.filter((dep) => {
    return [
        'devtron',
        'electron-debug',
      ].indexOf(dep) === -1;
  });
}

console.log('building with target: ' + target);
console.log('automatically packing vendor dependencies: ', runtimeDependencies.join('\n* '));
var options = {
  devServer: {
    inline: true,
    port: 3003,
    contentBase: './public'
  },
  entry: {
    vendor: ['./src/vendor.ts'].concat(runtimeDependencies),
    main: './src/electron-main.ts',
    app: './src/app.ts'
  },
  output: {
    path: './app',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  target: target,
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
    new webpack.NodeEnvironmentPlugin(),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunks: ['vendor', 'app']
    })
  ],
}

module.exports = options;
