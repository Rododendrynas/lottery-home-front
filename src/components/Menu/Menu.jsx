import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Menu.css';

const Menu = ({ logo, links, icons }) => {
  const navigate = useNavigate();
  return (
    <section className="wrapper">
      <div className="menu">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <nav className="links">
          {links.map((prop) => (
            <Link to={prop.path} key={prop.linkName}>
              {prop.linkName}
            </Link>
          ))}
          <i
            class={icons}
            onClick={(e) => {
              navigate('/login');
            }}
          ></i>
        </nav>
      </div>
    </section>
  );
};

export default Menu;
