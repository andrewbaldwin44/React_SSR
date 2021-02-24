import path from "path";
import Express from "express";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
// import counterApp from "./reducers";
// import App from "./containers/App";

const app = Express();
const port = 4000;

app
  .use("/static", Express.static("static"))
  .get("/", (req, res) => res.send("hello"))
  // .use(handleRender)
  .listen(port);

function handleRender(req, res) {
  /* ... */
}
function renderFullPage(html, preloadedState) {
  /* ... */
}
