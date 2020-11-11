import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Folder = ({ name, id }) => {
  return (
    <li className='folders'>
      <NavLink className='nav-link' to={`/folders/${id}`}>
        {name}
      </NavLink>
    </li>
  );
};

export default Folder;

Folder.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
