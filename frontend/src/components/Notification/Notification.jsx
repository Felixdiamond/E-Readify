import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Hide after 3 seconds

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, []);

  return visible ? (
    <div className="notification">
      {message}
    </div>
  ) : null;
};

export default Notification;
