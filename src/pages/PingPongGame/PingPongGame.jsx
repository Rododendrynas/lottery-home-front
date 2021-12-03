import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading, Circle, Button } from '../../components';

import './DiceGame.css';

const DiceGame = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [isWinn, setWinn] = useState();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/', linkName: 'Home' },
    { path: '/login', linkName: 'Login' },
  ];

  const getRandomNumbers = () =>
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/ping-pong/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          return alert(data.err);
        }

        if (data.length === 0) {
          return alert('Error by rolling ping pong');
        }
        setWinn(data.isWinner);
        return setData(data.numbers);
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false), setWinn(false));

  useEffect(() => {
    setLoading(false);
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
          data.map((circleValue, index) => (
            <Circle key={index} randomNumber={circleValue} />
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
