import React from "react";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";
import App from "./index";
import configureStore from "./redux/store";

const initialState = window.__INITIAL_STATE__;

delete window.__INITIAL_STATE__;

const store = configureStore(initialState);

function run() {
  hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

run()
