import React from 'react';
import { Link } from 'react-router-dom';

export default ({ folder }) => {
  return (
    <div className='folders'>
      <Link to={`/folder/${folder.id}`}> {folder.name} </Link>
    </div>
  );
};
