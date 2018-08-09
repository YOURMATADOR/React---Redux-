import React from "react";
import ReactDOM from "react-dom";
// import Rutas from "./routes/appRutas";
import { App } from "./play/agregarContador";
import { ReducerApp } from "./play/reduxPlay";
import { createStore } from "redux";
import { Provider } from "react-redux";
export let store = createStore(ReducerApp);
import "./styles/index.scss";

import "normalize.css";

ReactDOM.render(
  <Provider store={store}>
    <App /> 
  </Provider>,
  document.getElementById("titulo")
);
