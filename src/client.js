import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import App from "./index";
import configureStore from "./redux/reducers";

// const initialState = window.__INITIAL_STATE__;
//
// delete window.__INITIAL_STATE__;

const store = configureStore();

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
