import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';

import { Home, Login, Register, Dice, Account, PingPong } from './pages/';

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
              <Dice />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/pingpong"
          element={
            <PrivateRoute>
              <PingPong />
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
