import { createStore } from "redux";
// import { devToolsEnhancer } from "redux-devtools-extension";

import reducer from "./reducers";

const voidFunction = (params) => params;
const devToolsEnhancer = (process.env.CLIENT &&
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()) ||
  voidFunction;

export default function configureStore(initialState = {}) {
  const store = createStore(reducer, initialState, devToolsEnhancer);

  return store;
}
