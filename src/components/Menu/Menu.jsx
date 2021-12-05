import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import './Menu.css';

const Menu = ({ logo, links, icons }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <section className="wrapper">
      <div className="menu">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <nav className="links">
          {!!links &&
            links.map((prop) => (
              <Link to={prop.path} key={prop.linkName}>
                {prop.linkName}
              </Link>
            ))}
          {!!icons && (
            <i
              className={icons}
              onClick={(e) => {
                authContext.setToken('');
                navigate('/login');
              }}
            ></i>
          )}
        </nav>
      </div>
    </section>
  );
};

export default Menu;
