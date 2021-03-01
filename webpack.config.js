const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CommonWebpackConfig = require("./webpack.common.config");

const PROFILER = process.env.PROFILER === "true";
const PRODUCTION = process.env.PRODUCTION === "true";
const SERVER_RENDER = process.env.SERVER_RENDER === "true";
const SHARE = process.env.SHARE === "true";

function getInterpolationString({ onServerRender, onDevRender }) {
  if (SERVER_RENDER) {
    return onServerRender;
  }
  return onDevRender;
}

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, "src", "index.html"),
    html: getInterpolationString({
      onServerRender: "<%- html %>",
      onDevRender: ""
    }),
    initialState: getInterpolationString({
      onServerRender: "<%- initialState %>",
      onDevRender: ""
    })
  })
];

if (PROFILER) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: true,
      generateStatsFile: true,
      defaultSizes: "gzip",
      statsOptions: { source: false },
      reportFilename: path.join(__dirname, "profiler/report.html")
    })
  );
}

if (PRODUCTION) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })
  );
}

module.exports = {
  ...CommonWebpackConfig,

  entry: "./src/client.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/"
  },

  plugins,

  resolve: {
    extensions: [".js", ".ts", ".tsx"]
  },

  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader"
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(js|ts|tsx?)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      }
    ]
  },

  optimization: {
    moduleIds: "deterministic",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          name: "vendors"
        }
      }
    },
    usedExports: true
  },

  devServer: {
    host: "localhost",
    port: 3000,
    open: SHARE
  },

  node: {
    __dirname: true
  }
};
