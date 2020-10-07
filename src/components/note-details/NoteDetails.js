import React, { useContext } from 'react';
import NoteMainTitle from '../note-main-title/NoteMainTitle';
import ApiContext from '../../ApiContext';

import './noteDetails.css';
const NoteDetails = (props) => {
  const { notes } = useContext(ApiContext);
  const renderNote = () => {
    const note = notes.find((note) => note.id === props.match.params.noteId);
    return (
      <>
        <NoteMainTitle {...props} note={note} />
        <div className='note-details'>
          <p>
            Last Modified:<span>{note.modified}</span>
          </p>
          <p>{note.content}</p>
        </div>
      </>
    );
  };
  return <>{renderNote()}</>;
};
export default NoteDetails;
