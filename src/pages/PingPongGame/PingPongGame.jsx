import React, { useEffect, useContext, useState, useCallback } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading, Circle, Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getUserNickname } from '../../shared';

import './PingPongGame.css';

const getUserIdFromToken = (token) => {
  try {
    const jwt = jwt_decode(token);

    return jwt.id;
  } catch (e) {
    return null;
  }
};

const PingPongGame = () => {
  const authContext = useContext(AuthContext);
  const [userInputs, setUserInputs] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [isWinn, setWinn] = useState();
  const [nickname, setNickname] = useState();
  const navigate = useNavigate();

  const logo = process.env.REACT_APP_LOGO_URL;
  const account = 'fas fa-user';
  const signout = 'fas fa-sign-out-alt';

  const range = 45;
  const count = 5;

  // Get user id from token
  const userId = getUserIdFromToken(authContext.token);

  // Calback function for getting user nickname
  const getNickname = useCallback(() => {
    const gun = async () => {
      const data = await getUserNickname(userId, authContext.token);

      if (data.nickname) {
        setNickname(data.nickname);
        setLoading(false);
      } else {
        setError(data.error || 'Nickname not set');
      }
    };
    gun();
  }, [userId, setNickname, setLoading, authContext.token]);

  //Navigate to login page if token is not set
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
    //Get user nickname
    getNickname();
  }, [userId, navigate, getNickname]);

  const getRandomNumbers = (count, range) =>
    fetch(
      process.env.REACT_APP_BASE_URL +
        '/v1/content/pingpong/' +
        count +
        '/' +
        range +
        '/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${authContext.token || 'none'}`,
        },
        body: JSON.stringify(userInputs),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.err) {
          return setError(
            data.error || data.err || 'Error by getting Ping Pong numbers',
          );
        }
        if (data.length === 0) {
          return setError('Error by getting data');
        }
        setWinn(data.isWinner);
        return setData(data.randomNumbers);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  useEffect(() => {
    setUserInputs();
    setLoading();
  }, []);

  return (
    <section>
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
      {loading && <Loading />}
      <Menu logo={logo} account={account} signout={signout} />
      {loading && <Loading />}
      {!!nickname && (
        <h1 className="nickname">Hi, {nickname}! Insert your own numbers!</h1>
      )}

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          setError();
        }}
      >
        <div className="inputs">
          <input
            className="input"
            type="text"
            onChange={(e) =>
              setUserInputs({
                ...userInputs,
                num1: e.target.value.trim(),
              })
            }
            required
          />

          <input
            className="input"
            type="text"
            onChange={(e) =>
              setUserInputs({
                ...userInputs,
                num2: e.target.value.trim(),
              })
            }
            required
          />

          <input
            className="input"
            type="text"
            onChange={(e) =>
              setUserInputs({
                ...userInputs,
                num3: e.target.value.trim(),
              })
            }
            required
          />

          <input
            className="input"
            type="text"
            onChange={(e) =>
              setUserInputs({
                ...userInputs,
                num4: e.target.value.trim(),
              })
            }
            required
          />

          <input
            className="input"
            type="text"
            onChange={(e) =>
              setUserInputs({
                ...userInputs,
                num5: e.target.value.trim(),
              })
            }
            required
          />
        </div>
        <div className="getLuckyNumbersButton">
          <Button
            className="button"
            type="submit"
            onClick={(e) => {
              setError();
              !!userInputs && getRandomNumbers(count, range);
            }}
          >
            Try your luck!
          </Button>
        </div>
      </form>

      <h1 className="random wrapper">Your random lucky numbers are:</h1>
      <div id="pingpongPlatform" className="wrapper">
        {!!data &&
          Object.keys(data).length !== 0 &&
          data.map((value, index) => (
            <Circle key={index} randomNumber={value} />
          ))}
      </div>
      <div className="wrapper">
        {isWinn && (
          <Notification background="var(--secondary-color-light-green)">
            {<h1>Hurray! Today is your lucky day!</h1>}
          </Notification>
        )}

        {isWinn === false && (
          <Notification background="var(--tertiary-color-dark-green)">
            {<h1>Keep trying!</h1>}
          </Notification>
        )}
      </div>
    </section>
  );
};

export default PingPongGame;
