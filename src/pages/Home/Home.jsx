import React, { useEffect, useContext, useState, useCallback } from 'react';
import { AuthContext } from '../../contexts/auth';
import { Menu, Notification, Loading } from '../../components';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { getUserNickname } from '../../shared';

import './Home.css';

const Home = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState();
  const navigate = useNavigate();

  const dicePath = process.env.REACT_APP_LOGO_URL;
  const pingpongPath = process.env.REACT_APP_PINGPONG_URL;
  const account = 'fas fa-user';
  const signout = 'fas fa-sign-out-alt';

  const getUserIdFromToken = (token) => {
    try {
      const jwt = jwt_decode(token);

      return jwt.id;
    } catch (e) {
      return null;
    }
  };

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
      <Menu logo={dicePath} account={account} signout={signout} />
      {loading && <Loading />}
      {!!nickname && <h1 className="nickname">Hi, {nickname}! Let's play!</h1>}
      <div className="games wrapper">
        <div className="logo">
          <img
            src={dicePath}
            alt="dice"
            onClick={(e) => {
              navigate('/dice/');
            }}
          />
        </div>
        <div className="logo">
          <img
            src={pingpongPath}
            alt="pingpong"
            onClick={(e) => {
              navigate('/pingpong');
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
