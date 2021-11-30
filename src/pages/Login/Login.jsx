import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { Button, Menu, Notification } from '../../components';
import './Login.css';

const Login = () => {
  const [userInputs, setUserInputs] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [displayNotification, setNotificationDisplay] = useState(true);

  useEffect(() => {
    console.log(displayNotification);
  }, [displayNotification]);

  const authContext = useContext(AuthContext);

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/login', linkName: 'Login' },
    { path: '/register', linkName: 'Register' },
  ];

  return (
    <section className="section">
      {/* Error handling */}
      {!!error && setNotificationDisplay(() => true)}
      {!!error && !!displayNotification && (
        <Notification
          background="red"
          onClick={(e) => {
            setNotificationDisplay(() => false);
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
          e.preventDefault();

          fetch(process.env.REACT_APP_BASE_URL + '/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInputs),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.err) {
                return setError(data.err || 'Unknown error');
              }

              // Create and set jwt token
              authContext.setToken(data.token);

              alert('Successfully logged in');

              navigate('/');
            })
            .catch((err) => setError(err.message))
            .finally(() => e.target.reset());
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

        <div className="field">
          <div className="control">
            <Button className="button" type="submit">
              Login
            </Button>

            <Button
              className="button"
              type="button"
              onClick={(e) => {
                setNotificationDisplay(() => false);
              }}
            >
              Delete notification
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
