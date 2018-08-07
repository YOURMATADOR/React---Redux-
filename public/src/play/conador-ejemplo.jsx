class Contador extends React.Component {
  constructor(props) {
    super(props);
    this.DispararReinicio = this.DispararReinicio.bind(this);
    this.DispararAgregar = this.DispararAgregar.bind(this);
    this.DispararEliminar = this.DispararEliminar.bind(this);
    this.state = {
      contador: 1
    };
  }
  componentDidMount(prevP, prevS) {
    try {
      let contador = +localStorage.getItem("contador");
      this.setState(() => ({ contador }));
    } catch (e) {}
  }
  componentDidUpdate(prevP, prevS) {
    if (prevS.contador !== this.state.contador) {
      localStorage.setItem("contador", this.state.contador);
      console.log('guardar');
    }
  }
  DispararAgregar() {
    console.log("Agregar");
    this.setState(prev => {
      return {
        contador: prev.contador + 1
      };
    });
  }
  DispararEliminar() {
    console.log("Eliminar");
    this.setState(prev => {
      return {
        contador: prev.contador - 1
      };
    });
  }

  DispararReinicio() {
    this.setState(() => {
      // ?utilizar prev solo cuando quieras accesar a los valores previos
      return {
        contador: 0
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Contador {this.state.contador}</h1>
        <button onClick={this.DispararAgregar}>+1</button>
        <button onClick={this.DispararEliminar}>-1</button>
        <button onClick={this.DispararReinicio}>reiniciar</button>
      </div>
    );
  }
}

ReactDOM.render(<Contador />, document.getElementById("titulo"));

// let contadorApp = () => {
//     let botones = (
//         <div>
//             <h1> Contador {digito}</h1>
//             <button onClick={masUno}> +1 </button>
//             <button onClick={menosUno}> -1 </button>
//             <button onClick={ceros}> reset </button>
//         </div>
//     );
//     ReactDOM.render(botones, contenedo);
// };

// let digito = 0;

// let masUno = () => {
//     console.log(digito);
//     digito++;
//     contadorApp();
// };
// let menosUno = () => {
//     console.log(digito);
//     digito--;
//     contadorApp();
// };
// let ceros = () => {
//     console.log(digito);
//     digito = 0;
//     contadorApp();
// };

// contadorApp();
