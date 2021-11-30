import React from "react";
import { Link } from "react-router-dom";

import "./Menu.css";

const Menu = (props) => {
  return (
    <section className="menu">
      <img src={props.logo} alt="logo" />
      <div className="links">
        {props.links.map((prop) => (
          <Link to={prop.path} key={prop.linkName}>
            {prop.linkName}
          </Link>
        ))}{" "}
      </div>
    </section>
  );
};

export default Menu;
