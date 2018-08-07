import _ from "lodash";
import React from "react";
import ReactDom from 'react-dom';


const Titulo = () => {
    return( 
        <div>
        <h1>Hola</h1>
        </div>
    )
}
ReactDom.render(<Titulo />, document.getElementById('titulo'));
// console.log('hola');

// console.log('numero',_.isNumber(20));
// console.log('gg');

// console.log(suma(10,5));

// let eduardo = new Persona('eduardo',17);

// console.log(eduardo.puedoBeber());
// console.log('Es mayor ?', mayorEdad(40) );