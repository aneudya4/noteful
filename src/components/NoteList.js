import React, { useContext } from 'react';
import Note from './Note';
import ApiContext from './ApiContext';
import ErrorBoundary from './ErrorBoundary';

export default () => {
  const { notes } = useContext(ApiContext);
  const renderNotes = () => {
    return notes.map((note) => <Note key={note.id} note={note} />);
  };
  return (
    <div className='notes'>
      <ErrorBoundary>{renderNotes()}</ErrorBoundary>
    </div>
  );
};
