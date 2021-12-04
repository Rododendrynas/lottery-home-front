import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

const Menu = ({ logo, links }) => {
  return (
    <section className="wrapper">
      <div className="menu">
        <img src={logo} alt="logo" />
        <div className="links">
          {links.map((prop) => (
            <Link to={prop.path} key={prop.linkName}>
              {prop.linkName}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
