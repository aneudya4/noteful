import React, { useContext } from 'react';
import NoteMainTitle from './NoteMainTitle';
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
        </div>
      </>
    );
  };
  return <>{renderNote()}</>;
};
export default NoteDetails;
