import React from 'react';
import { Link } from 'react-router-dom';

const Folders = ({ notes, folders, location }) => {
  const renderFolders = () => {
    return folders.map((folder) => {
      return (
        <li key={folder.id}>
          <Link to={`/${folder.id}`}>{folder.name}</Link>
        </li>
      );
    });
  };
  return <ul>{renderFolders()}</ul>;
};

export default Folders;
