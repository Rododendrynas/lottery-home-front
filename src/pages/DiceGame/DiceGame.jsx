import React, { useEffect, useContext, useState, useCallback } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading, Dice, Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getUserNickname } from '../../shared';

import './DiceGame.css';

const getUserIdFromToken = (token) => {
  try {
    const jwt = jwt_decode(token);

    return jwt.id;
  } catch (e) {
    return null;
  }
};

const DiceGame = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [isWinn, setWinn] = useState();
  const [nickname, setNickname] = useState();
  const navigate = useNavigate();

  const logo = process.env.REACT_APP_LOGO_URL;
  const account = 'fas fa-user';
  const signout = 'fas fa-sign-out-alt';

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

  const getRandomNumbers = () =>
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/dice/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authContext.token || 'none'}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error || data.err) {
          return setError(
            data.error || data.err || 'Error by getting dice numbers',
          );
        }
        if (data.length === 0) {
          return setError('Error by rolling dice');
        }
        setWinn(data.isWinner);
        return setData(data.numbers);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  useEffect(() => {
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
        <h1 className="nickname">Hi, {nickname}! Let's play dice!</h1>
      )}

      <div id="dicePlatform" className="wrapper">
        {!!data &&
          Object.keys(data).length !== 0 &&
          data.map((diceValue, index) => (
            <Dice key={index} randomNumber={diceValue} />
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
      <div className="getLuckyNumbersButton">
        <Button
          className="button"
          type="button"
          onClick={(e) => {
            setError();
            getRandomNumbers(3, 6);
          }}
        >
          Roll the dice!
        </Button>
      </div>
    </section>
  );
};

export default DiceGame;
