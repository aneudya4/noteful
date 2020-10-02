import React, { useContext } from 'react';
import Folder from './Folder';
import ApiContext from './ApiContext';
export default () => {
  const { folders } = useContext(ApiContext);
  const renderFolder = () => {
    return folders.map((folder) => (
      <Folder key={folder.name} folder={folder} />
    ));
  };
  return <div>{renderFolder()}</div>;
};
