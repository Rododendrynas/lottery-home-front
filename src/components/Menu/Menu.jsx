import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import './Menu.css';

const Menu = ({ logo, links, account, signout }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <section className="wrapper">
      <div className="menu">
        <div className="logo">
          <img
            src={logo}
            alt="logo"
            onClick={(e) => {
              navigate('/');
            }}
          />
        </div>

        <nav className="links">
          {!!links &&
            links.map((prop) => (
              <Link to={prop.path} key={prop.linkName}>
                {prop.linkName}
              </Link>
            ))}
          {!!account && (
            <i
              className={account}
              onClick={(e) => {
                navigate('/account');
              }}
            ></i>
          )}
          {!!signout && (
            <i
              className={signout}
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
