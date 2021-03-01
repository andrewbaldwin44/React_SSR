import path from "path";
import Express from "express";
import React from "react";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { renderFile } from "ejs";

import configureStore from "../redux/store";
import App from "../index";

const app = Express();
const port = 3000;

app
  .set("views", path.join(__dirname, "../../dist"))
  .set("view engine", "ejs")
  .engine("html", renderFile)
  .get("*/", handleRender)
  .listen(port);

function handleRender(_, res) {
  const store = configureStore();

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const initialState = `
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(store.getState()).replace(
        /</g,
        "\\u003c"
      )};
    </script>
  `;

  res.render("index.html", { html, initialState });
}
