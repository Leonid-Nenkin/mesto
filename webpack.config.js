const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: { main: './src/scripts/pages/index.js' },
    output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
devServer: {open: true},
module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: '/node_modules/',
      use:{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /.(png|svg|jpg|gif)$/,
      loader: 'file-loader?name=./images/[name].[ext]'
    },
    {
      test: /.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader?name=./vendor/[name].[ext]',
    },
    {
      test: /\.html$/,
      loader: 'html-loader',
    },
    {
      test:/\.css$/,
      loader: [ MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
      'postcss-loader'
      ]
    }
  ]
  },
  plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new MiniCssExtractPlugin()
  ]
};