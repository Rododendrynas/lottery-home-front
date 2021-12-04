import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading, Dice, Button } from '../../components';
import { useNavigate } from 'react-router-dom';

import './DiceGame.css';

const DiceGame = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [isWinn, setWinn] = useState();
  const navigate = useNavigate();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [{ path: '/account', linkName: 'Account' }];

  // function handleResponse(response) {
  //   return response.text().then((text) => {
  //     const data = text && JSON.parse(text);

  //     if (!response.ok) {
  //       if ([401, 403].includes(response.status) && authContext?.token) {
  //         // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
  //         authContext.token = '';
  //         navigate('/login');
  //       }

  //       const error = (data && data.message) || response.statusText;
  //       setError(error);
  //       return Promise.reject(error);
  //     }

  //     return data;
  //   });
  // }

  const getRandomNumbers = () =>
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/dice/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${authContext.token || 'none'}`,
      },
    })
      .then((res) => res.json())
      // .then((res) => handleResponse(res))
      .then((data) => {
        if (data.error) {
          return setError(data.error);
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
      <Menu logo={logo} links={links} />

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
      <div id="diceRollButton">
        <Button
          className="button"
          type="button"
          onClick={(e) => {
            getRandomNumbers();
          }}
        >
          Roll the dice!
        </Button>
      </div>
    </section>
  );
};

export default DiceGame;
