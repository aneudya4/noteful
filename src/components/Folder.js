import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default ({ folder }) => {
  return (
    <div className='folders'>
      <ErrorBoundary>
        <Link to={`/folder/${folder.id}`}> {folder.name} </Link>
      </ErrorBoundary>
    </div>
  );
};
