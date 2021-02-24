const PRODUCTION = process.env.PRODUCTION === "true";

module.exports = {
  mode: PRODUCTION ? "production" : "development",

  devtool: PRODUCTION ? "source-map" : "eval-cheap-module-source-map"
};
