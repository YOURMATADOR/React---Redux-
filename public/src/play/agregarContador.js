import React, { Component } from "react";
import { ReducerApp } from "./reduxPlay";
import { createStore } from "redux";
import { store } from "./../app";
let contador = 0;

//** ? crea un elemento en la lista gracias a un maping que otorga las propiedades por cada vez que itinera en un objeto */
let Todo = ({ id, texto, completado, funcion }) => (
  <li
    key={id}
    onClick={funcion}
    style={{ textDecoration: completado ? "line-through" : "none" }}
  >
    {texto}
  </li>
);

let Todos = ({ elementosFiltrados, func }) => (
  <ul>
    {elementosFiltrados.map(i => (
      <Todo key={i.id} {...i} funcion={() => func(i.id)} />
    ))}
  </ul>
);

class TodosVisibles extends Component {
  componentDidMount = () => {
    this.uns = store.subscribe(() => {
      this.forceUpdate();
    });
  };
  componentWillUnmount() {
    this.uns();
  }
  render() {
    let props = this.props;
    let state = store.getState();
    return (
      <div>
        <Todos
          elementosFiltrados={filtrarTodos(state.Reducer, state.Filtrado)}
          func={id => store.dispatch({ type: "TOOGLE-TODO", id })}
        />
      </div>
    );
  }
}
const Link = ({ activo, children, func }) => {
  if (activo) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        func();
      }}
    >
      {" "}
      {children}
    </a>
  );
};

class Visibles extends Component {
  componentDidMount = () => {
    this.uns = store.subscribe(() => {
      this.forceUpdate();
    });
  };
  componentWillUnmount() {
    this.uns();
  }
  render() {
    return (
      <Link
        activo={this.props.filtro === store.getState().Filtrado}
        func={() => {
          store.dispatch({
            type: "SET-VISIBILITY-FILTER",
            filtro: this.props.filtro
          });
        }}
      >
        {this.props.children}
      </Link>
    );
  }
}

const Footer = () => (
  <h1>
    Mostrar:
    <Visibles filtro="SHOW-ALL">Todo</Visibles>
    <Visibles filtro="SHOW-ACTIVE">Activos</Visibles>
    <Visibles filtro="SHOW-INACTIVE">Inactivos</Visibles>
  </h1>
);

const AgregarTodo = () => {
  let entrada;
  return (
    <div>
      <input
        type="text"
        ref={e => {
          entrada = e;
        }}
      />
      <button
        onClick={() => {
          store.dispatch({
            type: "ADD-TODO",
            texto: entrada.value,
            id: contador++
          });
          entrada.value = "";
        }}
      >
        imprimir estado
      </button>
    </div>
  );
};

const filtrarTodos = (todos, filtro) => {
  switch (filtro) {
    case "SHOW-ALL":
      return todos;
      break;
    case "SHOW-ACTIVE":
      return todos.filter(e => e.completado);
    case "SHOW-INACTIVE":
      return todos.filter(e => !e.completado);
    default:
  }
};

const App = () => (
  <div>
    <h1> hola</h1>
    <AgregarTodo />
    <TodosVisibles />
    <Footer />
  </div>
);

export { App };
