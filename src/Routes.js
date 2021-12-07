import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DiceGame from './pages/DiceGame/DiceGame';
import Account from './pages/Account/Account';
import PingPongGame from './pages/PingPongGame/PingPongGame';

const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/dice"
          element={
            <PrivateRoute>
              <DiceGame />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/pingpong"
          element={
            <PrivateRoute>
              <PingPongGame />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default PageRouter;
