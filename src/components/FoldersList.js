import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Folder from './Folder';
import ApiContext from './ApiContext';
export default () => {
  const { folders } = useContext(ApiContext);
  const renderFolder = () => {
    return (
      <>
        {folders.map((folder) => (
          <Folder key={folder.id} folder={folder} />
        ))}
        <Link to='add-folder'>Add Folders</Link>
      </>
    );
  };
  return <div>{renderFolder()}</div>;
};
