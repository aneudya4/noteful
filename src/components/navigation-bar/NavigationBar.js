import React from 'react';
import PropTypes from 'prop-types';
import './navigationbar.css';

const NavigationBar = (props) => {
  return <div className={props.className}>{props.children}</div>;
};
export default NavigationBar;

NavigationBar.propTypes = {
  className: PropTypes.string,
};
