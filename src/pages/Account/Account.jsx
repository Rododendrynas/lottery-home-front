import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

import { Button, Menu, Notification } from '../../components';
import { useEffect } from 'react/cjs/react.development';

const Account = () => {
  const authContext = useContext(AuthContext);
  const [userInputs, setUserInputs] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/login', linkName: 'Login' },
    { path: '/register', linkName: 'Register' },
  ];

  /* Replace user nickname with a new one. */
  const changeUserNickname = () => {
    console.log(token.id);
    const userId = token.id;
    fetch(process.env.REACT_APP_BASE_URL + '/v1/auth/account/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${authContext.token || 'none'}`,
      },
      body: JSON.stringify(userInputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.err) {
          return setError(data.err || 'Unknown error');
        }

        alert('Successfully updated your nickname');
      })
      .catch((err) => alert(err.message));
  };

  const deleteAccount = () => {
    fetch(process.env.REACT_APP_BASE_URL + '/v1/auth/account', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${authContext.token || 'none'}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);

        alert('Successfully deleted your account');

        navigate('/register');
      })
      .catch((err) => alert(err.message));
  };

  return (
    <section className="section">
      <div className="container">
        {error && <Notification background="red">{error}</Notification>}
        <Menu logo={logo} links={links} />

        {/* Replace user nickname with a new one. */}
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            changeUserNickname();
            e.target.reset();
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
                    email: e.target.value.trim,
                  })
                }
                required
              />
            </div>
          </div>
          <div>
            <Button className="button" type="submit">
              Change your nickname
            </Button>
          </div>
        </form>

        <div className="wrapper">
          <Button
            className="button deleteButton"
            type="button"
            onClick={(e) => {
              deleteAccount();
            }}
          >
            Delete your account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Account;
