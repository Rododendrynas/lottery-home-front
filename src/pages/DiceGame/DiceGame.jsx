import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading, Dice, Button } from '../../components';

import './DiceGame.css';

const DiceGame = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

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
        return setData(data.numbers);
      })
      .catch((err) => alert(err.message));

  useEffect(() => getRandomNumbers(), []);

  return (
    <section>
      {error && <Notification background="red">{error}</Notification>}
      {loading && <Loading />}
      <Menu logo={logo} links={links} />

      <div id="dicePlatform" className="wrapper">
        {!!data &&
          data.map((diceValue, index) => (
            <Dice key={index} randomNumber={diceValue} />
          ))}
      </div>
      <Button className="button" type="button" /*onClick=???*/>
        Roll the dice!
      </Button>
    </section>
  );
};

export default DiceGame;
