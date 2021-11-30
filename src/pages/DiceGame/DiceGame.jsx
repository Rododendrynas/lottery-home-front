import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading, Dice, Button } from '../../components';

import './DiceGame.css';

const DiceGame = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [winn, setWinn] = useState();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/', linkName: 'Home' },
    { path: '/login', linkName: 'Login' },
  ];

  const getRandomNumbers = () =>
    fetch(process.env.REACT_APP_BASE_URL + '/v1/content/dice/', {
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
          return alert('Error by rolling dice');
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
      {error && <Notification background="red">{error}</Notification>}
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
        {winn && (
          <Notification background="green">
            {<h1>Hurray! Today is your lucky day!</h1>}
          </Notification>
        )}

        {winn === false && (
          <Notification background="red">{<h1>Keep trying!</h1>}</Notification>
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