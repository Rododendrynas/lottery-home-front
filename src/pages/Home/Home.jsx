import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading } from '../../components';

import './Home.css';

const Home = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const logo = process.env.REACT_APP_LOGO_URL;
  const links = [
    { path: '/', linkName: 'Home' },
    { path: '/add', linkName: 'Add' },
  ];

  return (
    <section>
      {error && <Notification background="red">{error}</Notification>}
      {loading && <Loading />}
      <Menu logo={logo} links={links} />
    </section>
  );
};

export default Home;
