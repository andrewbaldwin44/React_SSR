const path = require("path");
const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CommonWebpackConfig = require("./webpack.common.config");

const PRODUCTION = process.env.PRODUCTION === "true";
const PROFILER = process.env.PROFILER === "true";

const plugins = [];

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

if (!PRODUCTION) {
  plugins.push(
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  );
}

module.exports = {
  ...CommonWebpackConfig,

  entry: "./src/server/server.js",
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "dist", "server"),
    publicPath: ""
  },

  plugins,

  externalsPresets: { node: true },
  node: {
    __filename: true,
    __dirname: true
  },

  resolve: {
    extensions: [".js", ".ts"]
  },

  module: {
    rules: [
      {
        test: /\.(js|ts?)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },

  optimization: {
    minimize: false,
    usedExports: true
  },

  externals: {
    express: "commonjs express"
  },

  target: "node"
};
