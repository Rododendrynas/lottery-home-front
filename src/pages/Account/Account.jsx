import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import jwt_decode from 'jwt-decode';

import { Button, Menu, Notification, Loading } from '../../components';
import { getUserNickname } from '../../shared';
import { useEffect } from 'react/cjs/react.development';

const getUserIdFromToken = (token) => {
  try {
    const jwt = jwt_decode(token);
    console.log(token);
    return jwt.id;
  } catch (e) {
    return null;
  }
};

const Account = () => {
  console.log('Step1');
  const authContext = useContext(AuthContext);

  const [userInputs, setUserInputs] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [message, setMessage] = useState();
  const [nickname, setNickname] = useState();

  console.log('Step2');

  const logo = process.env.REACT_APP_LOGO_URL;
  const signout = 'fas fa-sign-out-alt';

  console.log('Step3');

  // Get user id from token
  const userId = getUserIdFromToken(authContext.token);

  console.log('Step4');

  // Calback function for getting user nickname
  const getNickname = useCallback(() => {
    const gun = async () => {
      const data = await getUserNickname(userId, authContext.token);

      if (data.nickname) {
        setNickname(data.nickname);
        setLoading(false);
      } else {
        setError(data.error || data.err || 'Nickname not set');
      }
    };
    gun();
  }, [userId, setNickname, setLoading, authContext.token]);

  console.log('Step5');

  //Navigate to login page if token is not set
  useEffect(() => {
    console.log('Step5.1:' + userId);
    if (!userId) {
      navigate('/login');
    }
    //Get user nickname
    getNickname();
  }, [userId, navigate, getNickname]);

  console.log('Step6');

  //Function for user to change his nickname. Get and set a new nickname from database.
  const changeNickname = (userId, userInputs) => {
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/account/' + userId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authContext.token}`,
      },
      body: JSON.stringify(userInputs),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.error || data.err) {
          return setError(
            data.error || data.err || 'Error by changing nickname',
          );
        }
        setMessage(
          `Successfully updated your nickname to ${userInputs.nickname}`,
        );
      })
      .catch((error) => setError(error))
      .finally(getNickname());
  };

  //Function for user to delete his account from database
  const deleteAccount = (userId) => {
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/account/' + userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authContext.token || 'none'}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error || res.err) {
          return setError('Error by deleting user');
        }
        navigate('/register');
      })
      .catch((err) => {
        return setError(err);
      });
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
      {message && (
        <Notification
          onClick={(e) => {
            setMessage();
          }}
        >
          {message}
        </Notification>
      )}
      <div className="container">
        <Menu logo={logo} signout={signout} />
        {loading && <Loading />}
        {!!nickname && (
          <h1 className="nickname">Hi, {nickname}! Let's play!</h1>
        )}

        {/* Replace user nickname with a new one. */}
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            setMessage();
            setError();

            if (!!userId) {
              changeNickname(userId, userInputs);
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
            className="button"
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
