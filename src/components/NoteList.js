import React, { useContext } from 'react';
import Note from './Note';
import ApiContext from './ApiContext';
export default () => {
  const { notes } = useContext(ApiContext);
  const renderNotes = () => {
    return notes.map((note) => <Note key={note.name} note={note} />);
  };
  return <div className='notes'> {renderNotes()}</div>;
};
