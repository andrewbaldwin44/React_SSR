import { combineReducers } from "redux";

function test(state = { test: "Test" }, { type }) {
  if (type === "TEST") {
    return {
      ...state,
      neat: "neat"
    };
  }
  return state;
}

export default combineReducers({ test });
