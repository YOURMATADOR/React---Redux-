import React, { Component } from "react";
import { ReducerApp } from "./reduxPlay";
import { createStore } from "redux";
import { connect } from "react-redux";
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
const RetornaElementosFiltrados = state => {
  return {
    elementosFiltrados: filtrarTodos(state.Reducer, state.Filtrado)
  };
};

const RetornaFuncionOnClick = dispatch => {
  return {
    func: id => {
      dispatch({ type: "TOOGLE-TODO", id });
    }
  };
};

const TodosVisibles = connect(
  RetornaElementosFiltrados,
  RetornaFuncionOnClick
)(Todos);
// class TodosVisibles extends Component {
//   componentDidMount = () => {
//     let { store } = this.props;
//     this.uns = store.subscribe(() => {
//       this.forceUpdate();
//     });
//   };
//   componentWillUnmount() {
//     this.uns();
//   }
//   render() {
//     let props = this.props;
//     const { store } = props;
//     let state = store.getState();
//     return (
//       <div>
//         <Todos
//           elementosFiltrados={filtrarTodos(state.Reducer, state.Filtrado)}
//           func={id => store.dispatch({ type: "TOOGLE-TODO", id })}
//         />
//       </div>
//     );
//   }
// }
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

const RetornarEstadoActualVsEstadoSolicitado = (state, misProps) => {
  return {
    activo: misProps.filtro === state.Filtrado
  };
};

const RetornaFuncion = (dispatch, misProps) => {
  return {
    func: () => {
      dispatch({ type: "SET-VISIBILITY-FILTER", filtro: misProps.filtro });
    }
  };
};

const Visibles = connect(
  RetornarEstadoActualVsEstadoSolicitado,
  RetornaFuncion
)(Link);
// class Visibles extends Component {
//   componentDidMount = () => {
//     const { store } = this.props;
//     this.uns = store.subscribe(() => {
//       this.forceUpdate();
//     });
//   };
//   componentWillUnmount() {
//     this.uns();
//   }
//   render() {
//     const { store } = this.props;
//     return (
//       <Link
//         activo={this.props.filtro === store.getState().Filtrado}
//         func={() => {
//           store.dispatch({
//             type: "SET-VISIBILITY-FILTER",
//             filtro: this.props.filtro
//           });
//         }}
//       >
//         {this.props.children}
//       </Link>
//     );
//   }
// }

const Footer = () => (
  <h1>
    Mostrar:
    <Visibles filtro="SHOW-ALL">Todo</Visibles>
    <Visibles filtro="SHOW-ACTIVE">Activos</Visibles>
    <Visibles filtro="SHOW-INACTIVE">Inactivos</Visibles>
  </h1>
);

let AgregarTodo = ({ dispatch }) => {
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
          dispatch({
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
AgregarTodo = connect()(AgregarTodo);
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

//? agrega una lista dependiento el estado del filtrado es
