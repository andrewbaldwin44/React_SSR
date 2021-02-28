<h1 align="center">React SSR with Webpack</h1>

### Optimizations

- CleanWebpackPlugin to clean dist folder before every build
- HtmlWebpackPlugin to generate index.html
- WebpackDevServer for live build updating in development
- splitChunks for code splitting
- CSS and Sass loader for parsing CSS or Scss
- Webpack asset/resource for loading images and fonts
- MiniCssExtractPlugin for splitting CSS or Scss and minifying
- contenthash and deterministic moduleIds used for browser caching
- source-maps used to find the source of errors
- BundleAnalyzerPlugin used to create a bundle analysis

### Scripts

**Start the client development server**

To start the development server, run `yarn start:client`. This will build the client-side and serve using webpack-dev-server.

**Start the development server in isomorphic**

To start the server in isomorphic, you will need to run two commands:

1. `yarn start:server`
2. `yarn dev:iso`

This will run the Node Express server using nodemon. Access the page at [localhost:3000](localhost:3000).

Both the client and server will be bundled using JavaScript and Webpack will watch the files for changes.

This is the server side rendering. When requests are made to the Node server, we render the initial HTML, CSS, and JavaScript on the server using react-dom. The HTML, CSS, and JavaScript are then sent to the client.

**In production**

For production, we use the `dist` folder. Running `yarn build` bundles our whole app and running `yarn start` will once again start the Node Express server, this time without nodemon. The server will then handle requests with the static `dist` files.

### Technologies Used

- Webpack 5
- Webpack Dev Server
- Webpack Bundle Analyzer
