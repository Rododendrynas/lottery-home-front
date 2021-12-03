import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Menu, Notification } from '../../components';

const Register = () => {
  const [userInputs, setUserInputs] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/login', linkName: 'Login' },
    { path: '/register', linkName: 'Register' },
  ];

  return (
    <section className="section">
      <div className="container">
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

        {/* Create a form to enter registration data. Save input data in database. */}
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();

            fetch(process.env.REACT_APP_BASE_URL + '/v1/auth/register', {
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
                navigate('/login');
              })
              .catch((err) => setError(err))
              .finally(() => e.target.reset());
          }}
        >
          <div>
            <label className="label">Nickname</label>
            <div>
              <input
                className="input"
                type="text"
                placeholder="nickname"
                onChange={(e) =>
                  setUserInputs({
                    ...userInputs,
                    nickname: e.target.value.trim(),
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className="label">Email</label>
            <div>
              <input
                className="input"
                type="email"
                placeholder="your_email@email.lt"
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
                Register
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Register;
