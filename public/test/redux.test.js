import {
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
} from "./../src/play/reduxPlay";
import { _ } from "lodash";
import deepFreeze from "deep-freeze";
import { createStore } from "redux";
describe("Contador test", () => {
  it("Agregar", () => {
    almacenamiento.dispatch({ type: "AGREGAR" });
    expect(almacenamiento.getState()).toBe(1);
  });
  it("Restar", () => {
    almacenamiento.dispatch({ type: "RESTAR" });
    expect(almacenamiento.getState()).toBe(0);
  });

  it("Indefinido", () => {
    almacenamiento.dispatch({ type: "CACA POPO" });
    expect(almacenamiento.getState()).toBe(0);
  });
  it("agregar por medio de redux", () => {
    almacenamiento.dispatch({ type: "AGREGAR" });
    expect(almacenamiento.getState()).toBe(1);
  });
  it("se unon", () => {
    actualiza();
    expect(actualiza()).toBe(1);
  });
  it("incrementar mucho", () => {
    almacenamiento.dispatch({ type: "AGREGAR", incrementarPor: 10 });
    expect(almacenamiento.getState()).toBe(11);
  });
  it("Restar mucho", () => {
    almacenamiento.dispatch({ type: "RESTAR", restarPor: 11 });
    expect(almacenamiento.getState()).toBe(0);
  });

  it("object destructuring", () => {
    const { titulo: tituloDelLibro, editoriales = "Desconocido" } = libro;
    expect(tituloDelLibro).toBe("Rayuela");
  });
  it("editorial = Desconocido", () => {
    const { titulo: tituloDelLibro, editoriales = "Desconocido" } = libro;
    expect(editoriales).toBe("Desconocido");
  });
});
describe("Agregar deep freeze", () => {
  it("agregar un cero al arreglo", () => {
    let arregloInicio = [];
    let arregloFinal = [0];
    deepFreeze(arregloInicio);
    expect(agregar(arregloInicio)).toEqual(arregloFinal);
  });
  it("Eliminar con deepFreze (sin clonar el arreglo)", () => {
    let arregloInicio = [10, 20, 30];
    let arregloFinal = [10, 30];
    deepFreeze(arregloInicio);

    expect(eliminar(arregloInicio, 1)).toEqual(arregloFinal);
  });
  it("sumar mas uno en el elemento especificado en el indice de la funcion", () => {
    let arregloInicio = [10, 29];
    let arregloFinal = [10, 30];
    deepFreeze(arregloInicio);
    expect(incrementar(arregloInicio, 1)).toEqual(arregloFinal);
  });
});

describe("Cambio de estado", () => {
  it("Cambiar el estado activo: true - false", () => {
    let objInicio = {
      nombre: "Perro Del chocho",
      contador: 0,
      activo: true
    };
    let objFin = {
      nombre: "Perro Del chocho",
      contador: 0,
      activo: false
    };
    deepFreeze(objInicio);
    expect(cambioEstado(objInicio)).toEqual(objFin);
  });

  it("Agregar un nuevo TODO con el estado completado como false", () => {
    let objInicio = [];
    let accion = {
      type: "ADD-TODO",
      texto: "HOLA QUE TAL!",
      id: 0
    };
    let objFinal = [
      {
        id: 0,
        texto: "HOLA QUE TAL!",
        completado: false
      }
    ];
    deepFreeze(accion);
    deepFreeze(objInicio);
    expect(Reducer(objInicio, accion)).toEqual(objFinal);
  });

  it("Cambiar el estado de completado a el inverso es decir de true a false y viceversa", () => {
    let objInicio = [
      {
        id: 0,
        texto: "HOLA QUE TAL!",
        completado: false
      },
      {
        id: 1,
        texto: "HOLA QUE TAL!",
        completado: false
      }
    ];
    let accion = {
      type: "TOOGLE-TODO",
      id: 0
    };
    let objFinal = [
      {
        id: 0,
        texto: "HOLA QUE TAL!",
        completado: true
      },
      {
        id: 1,
        texto: "HOLA QUE TAL!",
        completado: false
      }
    ];
    deepFreeze(accion);
    deepFreeze(objInicio);
    expect(Reducer(objInicio, accion)).toEqual(objFinal);
  });
});

describe("Estados de Reducer", () => {
  let store = createStore(ReducerApp);
  it("Estado inicial", () => {
    console.log("--------Estado inicio ------");
    console.log(store.getState());
    expect(store.getState()).toEqual([]);
  });
  it("Estado actual", () => {
    console.log("-------- Actual ------");
    store.dispatch({ type: "ADD-TODO", id: 0, texto: "GG IZI" });
    console.log(store.getState());
    expect(store.getState()).toEqual([
      { id: 0, texto: "GG IZI", completado: false }
    ]);
  });
  it("Toggle todo estado actual", () => {
    console.log("-------- Actual ------");
      console.log(store.getState());
    store.dispatch({ type: "TOOGLE-TODO", id: 0 });
      console.log(store.getState());

      store.dispatch({ type: "TOOGLE-TODO", id: 0 });
      console.log(store.getState());

    expect(store.getState()).toEqual([
      { id: 0, texto: "GG IZI", completado: true }
    ]);
  });
  it('Cambiar visibilidad', () => {
      console.log("-------- Actual ------");
      
      store.dispatch({type:'SET-VISIBILITY-FILTER',filtro:'HIDE-ALL'});
      console.log(store.getState());
      expect(store.getState()).toMatchObject({filtroVisibilidad: 'HIDE-ALL'})
  });
});
