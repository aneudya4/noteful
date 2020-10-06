import React, { useContext } from 'react';
import Note from '../note/Note';
import ApiContext from '../ApiContext';
import './noteList.css';
export default () => {
  const { notes } = useContext(ApiContext);
  const renderNotes = () => {
    return notes.map((note) => <Note key={note.id} note={note} />);
  };
  return <div className='notes'>{renderNotes()}</div>;
};
