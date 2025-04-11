const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env) => {
  const shouldOpenAnalyzer = env.analyze;

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "../server_php/public/"),
      publicPath: '/public/',
      filename: '[name].[contenthash].js',
      chunkFilename: '[name].[contenthash].js',
      clean: true
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          sharedComponents: {
            test: /[\\/]src[\\/]SharedComponents[\\/]/,
            name: 'shared-components',
            chunks: 'all',
          },
        },
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
      }),
      ...(shouldOpenAnalyzer ? [new BundleAnalyzerPlugin({analyzerMode: 'static', openAnalyzer: true})] : []),
    ],
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: { filename: "fonts/[hash][ext][query]" }
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: "asset/resource",
          generator: { filename: "images/[hash][ext][query]" }
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: [/(node_modules)/],
          loader: "babel-loader",
          options: { presets:
            [
              "@babel/env",
              [ '@babel/preset-react', { runtime: 'automatic' }],
              "@babel/preset-typescript"
            ]
          }
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options:
              {
                importLoaders: 1,
                modules: false // Set to true if you are using CSS modules
              }
            }
          ]
        }
      ]
    },
    resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] }
  };
}

