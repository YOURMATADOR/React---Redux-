class Persona {
  constructor(nombre = "Desconocido", edad = 0) {
    this.nombre = nombre;
    this.edad = edad;
  }

  saludar() {
    return `Hola mi nombre es ${this.nombre}`;
  }

  detalles() {
    return `soy ${this.nombre} y tengo ${this.edad} años`;
  }
}


class Viajero extends Persona {
  constructor(nombre, edad,ubicacion) {
    super(nombre,edad);
    this.ubicacion = ubicacion;
  }
  obtenerUbicacion() {
    let miUbicacion = super.saludar() + ' mi ubicacion es '+  this.ubicacion;
    return this.ubicacion ? miUbicacion : "Ubicacion desconocida";
  }
}

let eduardo = new Viajero("eduardo", 20, "New york");

console.log(eduardo.saludar());
console.log(eduardo.detalles());
console.log(eduardo.obtenerUbicacion());
