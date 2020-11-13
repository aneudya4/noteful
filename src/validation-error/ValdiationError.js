import React from 'react';
import PropTypes from 'prop-types';

const ValidationError = (props) => {
  return <div className='input-error'>{props.error}</div>;
};

export default ValidationError;

ValidationError.propTypes = {
  error: PropTypes.string.isRequired,
};
