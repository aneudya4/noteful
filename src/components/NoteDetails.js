import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NoteMainTitle from './NoteMainTitle';
// import AddNote from './AddNote';
import ApiContext from './ApiContext';

const NoteDetails = (props) => {
  const { notes } = useContext(ApiContext);
  const renderNote = () => {
    const note = notes.find((note) => note.id === props.match.params.noteId);
    return (
      <>
        <NoteMainTitle {...props} note={note} />
        <div>
          <h1>{note.name}</h1>
          <p>{note.modified}</p>
          <p>{note.content}</p>
          <Link to='../add-note'>Add Note</Link>
        </div>
      </>
    );
  };
  return <>{renderNote()}</>;
};
export default NoteDetails;
