import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import jwt_decode from 'jwt-decode';

import { Button, Menu, Notification } from '../../components';
import { useEffect } from 'react/cjs/react.development';

const getUserIdFromToken = (token) => {
  try {
    const jwt = jwt_decode(token);

    return jwt.id;
  } catch (e) {
    return null;
  }
};

const Account = () => {
  const authContext = useContext(AuthContext);

  const [userInputs, setUserInputs] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [message, setMessage] = useState();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/login', linkName: 'Login' },
    { path: '/register', linkName: 'Register' },
  ];

  const userId = getUserIdFromToken(authContext.token);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  const changeUserNickname = (userId, userInputs) => {
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/account/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${authContext.token}`,
      },
      body: JSON.stringify(userInputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.error) {
          return setError(data.error || 'Unknown error');
        }
        setMessage(
          `Successfully updated your nickname to ${userInputs.nickname}`,
        );
      })
      .catch((err) => setError(err));
  };

  const deleteAccount = (userId) => {
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/account/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // authorization: `Bearer ${authContext.token || 'none'}`,
      },
    })
      .then(() => navigate('/register'))
      .catch((err) => setError(err));
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
      {message && <Notification>{message}</Notification>}
      <div className="container">
        {error && <Notification background="red">{error}</Notification>}
        <Menu logo={logo} links={links} />

        {/* Replace user nickname with a new one. */}
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            if (!!userId) {
              changeUserNickname(userId, userInputs);
              e.target.reset();
            }
          }}
        >
          <div>
            <label className="label">New Nickname</label>
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
            <Button className="button" type="submit">
              Change your nickname
            </Button>
          </div>
        </form>

        <div className="wrapper">
          <Button
            className="button deleteButton"
            type="button"
            onClick={(e) => !!userId && deleteAccount(userId)}
          >
            Delete your account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Account;
