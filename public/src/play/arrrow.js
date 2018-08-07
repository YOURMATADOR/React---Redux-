let primerNombre = (nombres) => nombres.split(' ')[0];


let eduado = 'Eduardo Avila';

let multiplicaPor = (numeros, multiplicador) => numeros.map((numero) => numero * multiplicador);

let misNumero = [1, 23, 4434, 66, 1];


let digitos = {
    numeros: [1, 2, 3],
    multiplicador() {
        return multiplicaPor(this.numeros, 2);
    }
}
console.log(multiplicaPor(misNumero, 2));
console.log(digitos.multiplicador());
console.log(primerNombre(eduado));