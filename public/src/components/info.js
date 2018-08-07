import React from "react";
import { Route, Link } from "react-router-dom";

const Info = props => {
  return (
    <div>
      <ul>
        <li>
          <Link to={`${props.match.path}/1`}>Uno </Link>
        </li>
        <li>
          <Link to={`${props.match.path}/2`}>Dos </Link>
        </li>
        <li>
          <Link to={`${props.match.path}/3`}>Tres </Link>
        </li>
      </ul>
      <Route path={`${props.match.path}/:id`} component={informacion} />
      <Route
        path={`${props.match.path}`}
        render={() => (
          <div>
            <h1>-Selecciona una opcion!</h1>
          </div>
        )}
        exact
      />
    </div>
  );
};

const informacion = props => {

  return (
    <div>
      <h1>la info chida {props.location.pathname}</h1>
    </div>
  );
};
export default Info;

