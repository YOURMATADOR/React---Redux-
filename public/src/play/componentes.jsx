class IndecionApp extends React.Component {
  state = {
    opciones: []
  };

  componentDidMount(prevP, prevS) {
    try {
      let json = localStorage.getItem("opciones");
      let opciones = JSON.parse(json);
      if (opciones) {
        this.setState(() => ({ opciones }));
      } else {
        this.setState(() => ({ opciones: [] }));
      }
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.opciones.length !== this.state.opciones.length) {
      const json = JSON.stringify(this.state.opciones);
      localStorage.setItem("opciones", json);
    }
  }

  DispararAgregar(opcion) {
    if (!opcion) {
      return "Agrega una opcion";
    } else if (this.state.opciones.indexOf(opcion) > -1) {
      return "La opcion ya existe en el arreglo";
    }

    this.setState(prev => {
      return {
        opciones: prev.opciones.concat(opcion)
      };
    });
  }

  DispararEliminar() {
    this.setState(() => ({
      opciones: []
    }));
  }

  DispararElegir() {
    let rnd = Math.floor(Math.random() * this.state.opciones.length);

    alert(this.state.opciones[rnd]);
  }

  DispararEliminarUno(opcion) {
    this.setState(prev => ({
      opciones: prev.opciones.filter(e => e !== opcion) // * mantiene las opciones que sean distintas a el valor pasado por opcion
    }));
  }
  render() {
    return (
      <div>
        <Titulo titulo="Que debo hacer" subT="sub titulo pro" />
        <Opciones
          opciones={this.state.opciones}
          DispararEliminarUno={this.DispararEliminarUno}
        />
        <Agregar eventoAgregar={this.DispararAgregar} />
        <Eleccion
          DispararElegir={this.DispararElegir}
          vacio={this.state.opciones.length > 0 ? false : true}
        />
        <Eliminar
          opciones={this.state.opciones}
          DispararEliminar={this.DispararEliminar}
          vacio={this.state.opciones.length > 0 ? false : true}
        />
      </div>
    );
  }
}

const Titulo = props => {
  return (
    <div>
      <h1>{props.titulo}</h1>
      <h2>{props.subT}</h2>
    </div>
  );
};

// class Titulo extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>{this.props.titulo}</h1>
//         <h2>{this.props.subT}</h2>
//       </div>
//     );
//   }
// }

const Opciones = props => {
  return (
    <div>
      {props.opciones.length === 0 ? (
        <p>Agrega algo para iniciar!</p>
      ) : (
        <ul>
          <Opcion
            opcion={props.opciones}
            DispararEliminarUno={props.DispararEliminarUno}
          />
        </ul>
      )}
    </div>
  );
};

const Opcion = props => {
  return props.opcion.map((i, e) => (
    <div>
      {" "}
      <li key={i}>{i}</li>
      <button
        key={e + i}
        onClick={e => {
          props.DispararEliminarUno(i);
        }}
      >
        {" "}
        Remover{" "}
      </button>{" "}
    </div>
  ));
};

class Agregar extends React.Component {
  constructor(props) {
    super(props);
    this.DispararAgregar = this.DispararAgregar.bind(this);
    this.state = {
      error: undefined
    };
  }
  DispararAgregar(e) {
    e.preventDefault();
    let valor = e.target.elements.nOpcion.value;
    let error = this.props.eventoAgregar(valor);

    this.setState(() => ({
      error
    }));

    if (!error) {
      e.target.elements.nOpcion.value = "";
    }
  }
  render() {
    return (
      <div>
        {this.state.error && <h3>{this.state.error}</h3>}
        <form onSubmit={this.DispararAgregar}>
          <input type="text" name="nOpcion" />
        </form>
      </div>
    );
  }
}
const Eliminar = props => {
  return (
    <div>
      <button onClick={props.DispararEliminar} disabled={props.vacio}>
        Eliminar todo
      </button>
    </div>
  );
};

const Eleccion = props => {
  return (
    <div>
      <button onClick={props.DispararElegir} disabled={props.vacio}>
        Que debo hacer ?
      </button>
    </div>
  );
};

ReactDOM.render(<IndecionApp />, document.getElementById("titulo"));
