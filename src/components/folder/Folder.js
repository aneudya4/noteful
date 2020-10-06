import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Folder = ({ folder }) => {
  return (
    <li className='folders'>
      <NavLink className='nav-link' to={`/folder/${folder.id}`}>
        {folder.name}
      </NavLink>
    </li>
  );
};

export default Folder;

Folder.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};
