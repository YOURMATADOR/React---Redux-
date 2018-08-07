class Toogle extends React.Component {

constructor (props) {
  super(props);
  this.state = {
    mostrar: true
  }
  this.DisparaToggle = this.DisparaToggle.bind(this);
}
DisparaToggle(){

  this.setState ((prev) => {
    return{
    mostrar: !prev.mostrar
    }
  })
}
render() {
  return (
    <div>
   <h1>Toggle visibility </h1> 
   <button onClick={this.DisparaToggle}>{this.state.mostrar ? 'Esconder' : 'Mostrar'}</button>
   {this.state.mostrar && <p>Texto escondido</p>}
    </div>
  )
}
}

ReactDOM.render(<Toogle />, document.getElementById('titulo'));
// let mostrar = true;
// let esconderTexto = () => {
//   mostrar = !mostrar;
//   render();
// };

// const render = () => {
//   let componente = (
//     <div>
//       <h1>toggle visibility</h1>
//       <button onClick={esconderTexto}>
//         {mostrar ? "Esconder contenido" : "mostrar contenido"}
//       </button>
//       {mostrar && (
//         <div>
//           <p> Algo de contenido secreto</p>
//         </div>
//       )}
//     </div>
//   );
//   ReactDOM.render(componente, document.getElementById("titulo"));
// };

// render();
