import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, showAlert, setShowAlert }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showAlert) {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        setShowAlert(false);
      }, 3000); // Hide alert after 3 seconds (adjust duration as needed)
    }
  }, [showAlert, setShowAlert]);

  return (
    <div className={`alert ${visible ? 'show' : ''}`}>

     {message}
    </div>
  );
};

export default Alert;
