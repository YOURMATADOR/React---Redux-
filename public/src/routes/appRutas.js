import React from "react";
import { BrowserRouter, Route, Switch,Link, NavLink } from "react-router-dom";

import Nav from "./../components/Nav";
import { Error } from "./../components/Error";
import {Header} from "./../components/Header";
import Inicio from './../components/inicio'
import home from "./../components/home";
import Info from './../components/info';
const Rutas = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Nav />
      <Switch>
        <Route path="/" component={Inicio} exact />
        <Route path="/home" component={home} />
        <Route path='/info' component={Info} />
        <Route component={Error} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default Rutas;
