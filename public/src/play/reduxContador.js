import { createStore } from "redux";

const Reducer = (arreglo = {}, accion) => {
  switch (accion.type) {
    case "INCREMENT":
      return {
        ...arreglo,
        contador: accion.cantidad + (arreglo.contador ? arreglo.contador : 1)
      };
    case "DECREMENT":
      console.log(arreglo.contador);
      return {
        ...arreglo,
        contador: (arreglo.contador ? arreglo.contador : 1) - accion.cantidad
      };
    case "SET":
      return {
        ...arreglo,
        contador: accion.valor
      };
    case "RESET":
      return {
        ...arreglo,
        contador: 0
      };
    default:
      return arreglo;
  }
};

export const incrementar = ({ cantidad = 1 } = {}) => ({
  type: "INCREMENT",
  cantidad
});
export const decrementar = ({ cantidad = 1 } = {}) => ({
  type: "DECREMENT",
  cantidad
});
export const set = ({ valor = 1 } = {}) => ({ type: "SET", valor });
export const reset = () => ({ type: "RESET" });

export const store = createStore(Reducer);
