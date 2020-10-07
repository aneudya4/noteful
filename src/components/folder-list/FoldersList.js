import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Folder from '../folder/Folder';
import ApiContext from '../../ApiContext';
import './folderList.css';
const FoldersList = () => {
  const { folders } = useContext(ApiContext);
  const renderFolder = () => {
    return (
      <>
        {folders.map((folder) => (
          <Folder key={folder.id} name={folder.name} id={folder.id} />
        ))}
        <div className='add-folder-btn'>
          <Link to='/add-folder'>Add Folders</Link>
        </div>
      </>
    );
  };
  return (
    <div className='folders-container'>
      <ul>{renderFolder()}</ul>
    </div>
  );
};
export default FoldersList;

FoldersList.defaultProps = {
  folders: [],
};
