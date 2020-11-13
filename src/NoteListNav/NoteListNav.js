import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleButton from '../CircleButton/CircleButton';
import ApiContext from '../ApiContext';
import config from '../config';
import { countNotesForFolder } from '../notes-helpers';
import './NoteListNav.css';

export default class NoteListNav extends React.Component {
  static contextType = ApiContext;

  findFoldersLength = (folderid) => {
    const folderContent = this.context.notes.find(
      (notes) => notes.folderid === folderid.toString()
    );
    return folderContent;
  };

  onClickDelete = (folderid) => {
    if (this.findFoldersLength(folderid)) {
      alert('Cant delete a folder that contains notes');
      return;
    }
    fetch(`${config.API_ENDPOINT}/folders/${folderid}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return;
      })
      .then(() => {
        this.context.deleteFolder(folderid);
      })
      .catch((error) => {
        console.error({ error });
      });
  };
  render() {
    const { folders = [], notes = [] } = this.context;
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map((folder) => (
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes Folder__delete '>
                  <button onClick={() => this.onClickDelete(folder.id)}>
                    <i className='fas fa-trash'></i>
                  </button>
                </span>
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
        </div>
      </div>
    );
  }
}
