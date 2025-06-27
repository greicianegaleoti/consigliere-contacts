import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p className="loader-text">Loading contacts...</p>
    </div>
  );
}

export default Loader;
