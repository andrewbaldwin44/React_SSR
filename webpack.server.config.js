const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CommonWebpackConfig = require("./webpack.common.config");

const PROFILER = process.env.PROFILER === "true";

const plugins = [new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })];

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
