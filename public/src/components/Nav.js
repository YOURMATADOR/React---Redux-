import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <div>
    <ul>
      <li>
        <Link to="/"> inicio </Link>
      </li>
      <li>
        <Link to="/home">home </Link>
      </li>
      <li>
        <Link to="/info">info</Link>
      </li>
    </ul>
  </div>
);

export default Nav;
