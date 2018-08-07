import React from "react";
import ReactDOM from "react-dom";
// import Rutas from "./routes/appRutas";
import { App } from "./play/agregarContador";
import { ReducerApp } from "./play/reduxPlay";
import { createStore } from "redux";

export let store = createStore(ReducerApp);
import "./styles/index.scss";

import "normalize.css";

ReactDOM.render(
  <App {...store.getState()} />, //? pasa los argumentos con las mismas etiquetas que el objeto retornado
  document.getElementById("titulo")
);
