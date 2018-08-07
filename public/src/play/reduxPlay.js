import { createStore, combineReducers } from "redux";

const contador = (numero = 0, accion) => {
  let incrementarPor =
    typeof accion.incrementarPor === "number" ? accion.incrementarPor : 1;
  let restarPor = typeof accion.restarPor === "number" ? accion.restarPor : 1;
  switch (accion.type) {
    case "AGREGAR":
      return numero + incrementarPor;
    case "RESTAR":
      return numero - restarPor;
    default:
      return numero;
  }
};

let almacenamiento = createStore(contador); // ? crea almacenamiento con redux

const actualiza = () => {
  console.log(almacenamiento.getState());
  return almacenamiento.getState();
};
almacenamiento.subscribe(actualiza)(); //ajecuta la funcion cada vez que se actuliza el estado

const libro = {
  titulo: "Rayuela",
  autor: "Julio Cortazar"
  //   editoriales: [
  //     {
  //       nombre: "wm",
  //       region: "mexico"
  //     },
  //     {
  //       nombre: "fff",
  //       region: "usa"
  //     }
  //   ]
};

const agregar = lista => {
  return [...lista, 0]; // * crea un nuevo arreglo sin clonar es decir crea un arreglo totalmente nuevo que para evitar deepFreeze o un arreglo que no se puede modificar
};
const eliminar = (lista, indice) => {
  return [...lista.slice(0, indice), ...lista.slice(indice + 1)];
};

const incrementar = (lista, indice) => {
  return [
    ...lista.slice(0, indice),
    lista[indice] + 1,
    ...lista.slice(indice + 1)
  ];
};
const cambioEstado = objeto => {
  return { ...objeto, activo: !objeto.activo };
};

const ReducerAccion = (arreglo =[], accion) => {
  switch (accion.type) {
    case "ADD-TODO":
      return {
        id: accion.id,
        texto: accion.texto,
        completado: false
      };
    case "TOOGLE-TODO":
      return arreglo.id !== accion.id
        ? arreglo
        : { ...arreglo, completado: !arreglo.completado };
     

    default:
      return arreglo;
      
  }
};

const Reducer = (arreglo = [], accion) => {
  switch (accion.type) {
    case "ADD-TODO":
      return [...arreglo, ReducerAccion(undefined, accion)];
    case "TOOGLE-TODO":
      return arreglo.map(i => ReducerAccion(i, accion));
    default:
      return arreglo;
  }
};
const Filtrado = (estado = "SHOW-ALL", accion) => {
  switch (accion.type) {
    case "SET-VISIBILITY-FILTER":
      return accion.filtro;
    default:
      return estado;
  }
};

const ReducerApp = combineReducers({Reducer, Filtrado})
// const ReducerApp = (arreglo = {}, accion) => {
//     console.log(arreglo.todos);

//   return {
//     todos: Reducer(arreglo.todos, accion),
//     filtroVisibilidad: Filtrado(accion.filtro, accion)
//   };
// };
export {
  contador,
  almacenamiento,
  actualiza,
  libro,
  agregar,
  eliminar,
  incrementar,
  cambioEstado,
  Reducer,
  ReducerApp
};
