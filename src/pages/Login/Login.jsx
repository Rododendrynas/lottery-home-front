import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { Button, Menu, Notification } from '../../components';
import './Login.css';

const Login = () => {
  const [userInputs, setUserInputs] = useState();
  const [error, setError] = useState();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [{ path: '/register', linkName: 'Register' }];

  const login = (e) => {
    fetch(process.env.REACT_APP_BASE_URL + '/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!!data.error || !!data.err) {
          setError(data.error || data.err || 'Unknown error during login');
          return;
        }

        // Create and set jwt token
        authContext.setToken(data.token);

        navigate('/');
      })
      .catch(() => setError('Error during reaching server'))
      .finally(() => e.target.reset());
  };

  return (
    <section className="section">
      {/* Error handling */}
      {!!error && (
        <Notification
          background="red"
          onClick={(e) => {
            setError();
          }}
        >
          {error}
        </Notification>
      )}

      <Menu logo={logo} links={links} />
      {/* Create a form to enter login data. Save input data in database. */}
      <form
        className="form"
        onSubmit={(e) => {
          setError();
          e.preventDefault();
          login(e);
        }}
      >
        <div>
          <label className="label">Email</label>
          <div>
            <input
              className="input"
              type="email"
              placeholder="email@email.lt"
              onChange={(e) =>
                setUserInputs({
                  ...userInputs,
                  email: e.target.value.trim().toLowerCase(),
                })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="label">Password</label>
          <div>
            <input
              className="input"
              type="password"
              placeholder="password"
              onChange={(e) =>
                setUserInputs({
                  ...userInputs,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
        </div>

        <div>
          <Button className="button" type="submit">
            Login
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Login;
