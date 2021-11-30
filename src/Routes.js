import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import DiceGame from './pages/DiceGame/DiceGame';
// import Account from './pages/Account/Account';

const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dice" element={<DiceGame />} />
        {/* <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default PageRouter;
