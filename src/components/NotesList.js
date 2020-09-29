import React from 'react';
import { Link, Route } from 'react-router-dom';
import Note from './Note';
const NotesList = ({ match, notes, location }) => {
  const filterNotes = (notes) => {
    const filtered = notes.filter(
      (note) => note.folderId === match.params.folderId
    );
    return filtered;
  };
  const renderNotes = (allNotes) => {
    return allNotes.map((note) => {
      return (
        <li key={note.id}>
          <Link to={`/note/${note.id}`}>{note.name}</Link>
        </li>
      );
    });
  };
  return (
    <>
      <ul>
        {match.params.folderId
          ? renderNotes(filterNotes(notes))
          : renderNotes(notes)}
      </ul>
      <Route
        path={`/note/:noteId`}
        render={(routerProps) => (
          <Note notes={filterNotes(notes)} {...routerProps} />
        )}
      />
    </>
  );
};

export default NotesList;
