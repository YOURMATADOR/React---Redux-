import { createStore, combineReducers } from "redux";
import uuidv1 from "uuid/v1";
const Todos = (array = [], accion) => {
  switch (accion.type) {
    case "ADD-TODO":
      return [...array, accion.expense];
      break;
    case "DEL-TODO":
      return array.filter(i => i.id !== accion.id);
      break;
    case "EDIT-TODO":
      return array.map(
        i => (i.id === accion.id ? { ...i, ...accion.propiedades } : i)
      );

    default:
      return array;
  }
};

const Filtro = (
  array = { tipo: "", texto: " ", inicio: 0, fin: 0 },
  accion
) => {
  switch (accion.type) {
    case "SET-FILTER-TEXT":
      return { ...array, texto: accion.texto };
      break;
    case "SET-FILTER-DATE":
      return { ...array, tipo: accion.tipo };
    case "SET-FILTER-MONTO":
      return { ...array, tipo: accion.tipo };
    case "SET-FIRST-DATE":
      return { ...array, inicio: accion.fecha };
    case "SET-SECOND-DATE":
      return { ...array, fin: accion.fecha };
    default:
      return array;
  }
};
export const TodosVisibles = (Todos, { tipo, texto, inicio, fin, accion }) =>
  Todos.filter(i => {
    const esMayorInicio = typeof inicio !== "number" || i.creadoEl >= inicio;
    const esMenorFin = typeof fin !== "number" || i.creadoEl <= fin;
    const textoEsIgual = i.descripcion
      .toLowerCase()
      .trim()
      .includes(texto.toLowerCase());
    return esMayorInicio && esMenorFin && textoEsIgual;
  }).sort((a, b) => {
    if (tipo === "monto") {
      return a.monto < b.monto ? 1 : -1;
    } else if (tipo === "fecha") {
      return a.creadoEl < b.creadoEl ? 1 : -1;
    }
  });

export const agregarTodo = ({
  descripcion = " ",
  monto = 0,
  creadoEl = 0,
  nombre = ""
} = {}) => ({
  type: "ADD-TODO",
  expense: {
    descripcion,
    id: uuidv1(),
    creadoEl,
    monto,
    nombre
  }
});

export const eliminarTodo = ({ id } = {}) => ({
  type: "DEL-TODO",
  id
});

export const editarTodo = ({ id, propiedades = {} } = {}) => ({
  type: "EDIT-TODO",
  id,
  propiedades
});

export const filtrarTexto = ({ texto = "" } = {}) => ({
  type: "SET-FILTER-TEXT",
  texto
});

export const filtrarPorMonto = ({ tipo = "monto" } = {}) => ({
  type: "SET-FILTER-MONTO",
  tipo
});
export const filtrarPorFecha = ({ tipo = "fecha" } = {}) => ({
  type: "SET-FILTER-DATE",
  tipo
});
export const cambiarFechaInicio = ({ fecha = undefined }) => ({
  type: "SET-FIRST-DATE",
  fecha
});

export const cambiarFechaFin = ({ fecha = undefined }) => ({
  type: "SET-SECOND-DATE",
  fecha
});
const Reducer = combineReducers({ Todos, Filtro });
export const store = createStore(Reducer);
