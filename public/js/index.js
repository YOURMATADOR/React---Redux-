"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecionApp = function (_React$Component) {
  _inherits(IndecionApp, _React$Component);

  function IndecionApp(props) {
    _classCallCheck(this, IndecionApp);

    var _this = _possibleConstructorReturn(this, (IndecionApp.__proto__ || Object.getPrototypeOf(IndecionApp)).call(this, props));

    _this.state = {
      opciones: []
    };

    _this.DispararAgregar = _this.DispararAgregar.bind(_this);
    _this.DispararEliminar = _this.DispararEliminar.bind(_this);
    _this.DispararElegir = _this.DispararElegir.bind(_this);
    _this.DispararEliminarUno = _this.DispararEliminarUno.bind(_this);
    return _this;
  }

  _createClass(IndecionApp, [{
    key: "componentDidMount",
    value: function componentDidMount(prevP, prevS) {
      try {
        var json = localStorage.getItem("opciones");
        var opciones = JSON.parse(json);
        if (opciones) {
          this.setState(function () {
            return { opciones: opciones };
          });
        } else {
          this.setState(function () {
            return { opciones: [] };
          });
        }
      } catch (e) {}
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.opciones.length !== this.state.opciones.length) {
        var json = JSON.stringify(this.state.opciones);
        localStorage.setItem("opciones", json);
      }
    }
  }, {
    key: "DispararAgregar",
    value: function DispararAgregar(opcion) {
      if (!opcion) {
        return "Agrega una opcion";
      } else if (this.state.opciones.indexOf(opcion) > -1) {
        return "La opcion ya existe en el arreglo";
      }

      this.setState(function (prev) {
        return {
          opciones: prev.opciones.concat(opcion)
        };
      });
    }
  }, {
    key: "DispararEliminar",
    value: function DispararEliminar() {
      this.setState(function () {
        return {
          opciones: []
        };
      });
    }
  }, {
    key: "DispararElegir",
    value: function DispararElegir() {
      var rnd = Math.floor(Math.random() * this.state.opciones.length);

      alert(this.state.opciones[rnd]);
    }
  }, {
    key: "DispararEliminarUno",
    value: function DispararEliminarUno(opcion) {
      this.setState(function (prev) {
        return {
          opciones: prev.opciones.filter(function (e) {
            return e !== opcion;
          }) // * mantiene las opciones que sean distintas a el valor pasado por opcion
        };
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(Titulo, { titulo: "Que debo hacer", subT: "sub titulo pro" }),
        React.createElement(Opciones, {
          opciones: this.state.opciones,
          DispararEliminarUno: this.DispararEliminarUno
        }),
        React.createElement(Agregar, { eventoAgregar: this.DispararAgregar }),
        React.createElement(Eleccion, {
          DispararElegir: this.DispararElegir,
          vacio: this.state.opciones.length > 0 ? false : true
        }),
        React.createElement(Eliminar, {
          opciones: this.state.opciones,
          DispararEliminar: this.DispararEliminar,
          vacio: this.state.opciones.length > 0 ? false : true
        })
      );
    }
  }]);

  return IndecionApp;
}(React.Component);

var Titulo = function Titulo(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      props.titulo
    ),
    React.createElement(
      "h2",
      null,
      props.subT
    )
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

var Opciones = function Opciones(props) {
  return React.createElement(
    "div",
    null,
    props.opciones.length === 0 ? React.createElement(
      "p",
      null,
      "Agrega algo para iniciar!"
    ) : React.createElement(
      "ul",
      null,
      React.createElement(Opcion, {
        opcion: props.opciones,
        DispararEliminarUno: props.DispararEliminarUno
      })
    )
  );
};

var Opcion = function Opcion(props) {
  return props.opcion.map(function (i, e) {
    return React.createElement(
      "div",
      null,
      " ",
      React.createElement(
        "li",
        { key: i },
        i
      ),
      React.createElement(
        "button",
        {
          key: e + i,
          onClick: function onClick(e) {
            props.DispararEliminarUno(i);
          }
        },
        " ",
        "Remover",
        " "
      ),
      " "
    );
  });
};

var Agregar = function (_React$Component2) {
  _inherits(Agregar, _React$Component2);

  function Agregar(props) {
    _classCallCheck(this, Agregar);

    var _this2 = _possibleConstructorReturn(this, (Agregar.__proto__ || Object.getPrototypeOf(Agregar)).call(this, props));

    _this2.DispararAgregar = _this2.DispararAgregar.bind(_this2);
    _this2.state = {
      error: undefined
    };
    return _this2;
  }

  _createClass(Agregar, [{
    key: "DispararAgregar",
    value: function DispararAgregar(e) {
      e.preventDefault();
      var valor = e.target.elements.nOpcion.value;
      var error = this.props.eventoAgregar(valor);

      this.setState(function () {
        return {
          error: error
        };
      });

      if (!error) {
        e.target.elements.nOpcion.value = "";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.state.error && React.createElement(
          "h3",
          null,
          this.state.error
        ),
        React.createElement(
          "form",
          { onSubmit: this.DispararAgregar },
          React.createElement("input", { type: "text", name: "nOpcion" })
        )
      );
    }
  }]);

  return Agregar;
}(React.Component);

var Eliminar = function Eliminar(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.DispararEliminar, disabled: props.vacio },
      "Eliminar todo"
    )
  );
};

var Eleccion = function Eleccion(props) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "button",
      { onClick: props.DispararElegir, disabled: props.vacio },
      "Que debo hacer ?"
    )
  );
};

ReactDOM.render(React.createElement(IndecionApp, null), document.getElementById("titulo"));
