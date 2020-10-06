import React from 'react';
import './appHeader.css';
import { Link } from 'react-router-dom';
export default () => {
  return (
    <header>
      <h1>
        <Link to='/'>Noteful</Link>
      </h1>
    </header>
  );
};
