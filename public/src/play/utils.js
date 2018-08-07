let suma = (a,b) => a + b;

class Persona {
    constructor(nombre,edad){
        this.nombre= nombre;
        this.edad = edad;
    }

    puedoBeber(){
        return this.edad && this.edad >= 18 ? `${this.nombre} puede beber`: `${this.nombre} espera un poco mas viejo.`
    }
}
let esMayor = (edad) => edad >= 65;
export default esMayor;
export {suma, Persona};