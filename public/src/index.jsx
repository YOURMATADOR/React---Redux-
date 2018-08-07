let libro = {
  titulo: "Rayuela",
  año: 1990,
  editoriales: ["hola", "shake me down"]
};

let agregarEditorial = e => {
  e.preventDefault();
  let entrada = e.target.elements.opcion.value;

  if (entrada) {
    e.target.elements.opcion.value = "";
    libro.editoriales.push(entrada);
    editorialesComponente();
  }
};

let limpiarEditoriales = e => {
  e.preventDefault();
  libro.editoriales = [];
  editorialesComponente();
};

function opcionesDisponibles(opciones) {
  return opciones && opciones.length > 0 ? opciones : false;
}

let persona = {
  nombre: "Eduardo",
  edad: "20",
  profesion: "web developer"
};

let editorialesComponente = () => {
  let titulo = (
    <div>
      <h1>Titulo {libro.titulo ? libro.titulo : "Desconocido"}</h1>
      <p>{libro.año && libro.año > 1989 && libro.año}</p>
      <p>
        {opcionesDisponibles(libro.editoriales)
          ? `Tus opciones ${libro.editoriales.join(", ")}`
          : "sin opciones"}
      </p>
      <form onSubmit={agregarEditorial}>
        <input type="text" name="opcion" />
        <input type="submit" />
        <button onClick={limpiarEditoriales}>Limpiar lista</button>
      </form>
      <ol>
        {libro.editoriales.map(editorial => (
          <li key={editorial}>{editorial} </li>
        ))}
      </ol>
    </div>
  );
  let contenedo = document.getElementById("titulo");

  ReactDOM.render(titulo, contenedo);
};
// let miDatos = (
//   <div>
//     <ul>
//       <li>{persona.profesion}</li>
//     </ul>
//     <h1>{persona.nombre}</h1>
//     <p>edad 20</p>
//     <p>profesion web developer</p>
//   </div>
// );

editorialesComponente();
