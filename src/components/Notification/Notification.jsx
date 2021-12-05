import React from 'react';

import './Notification.css';

const Notification = ({ background, onClick, children }) => {
  const style = {
    background: background || 'var(--primary-color-gold)',
  };

  return (
    <div className="notification" style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export default Notification;
