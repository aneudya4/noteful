import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ApiContext from './ApiContext';

const Note = ({ note, match }) => {
  const { deleteNote } = useContext(ApiContext);
  const filterNotes = () => {
    console.log(deleteNote, 'here');
    if (match.params.folderId) {
      console.log(match.params);
      return (
        note.folderId === match.params.folderId && (
          <>
            <Link to={`/notes/${note.id}`}> {note.name} </Link>
            <button onClick={() => deleteNote(note.id)}>delete</button>
          </>
        )
      );
    }
    return (
      <>
        <Link to={`/notes/${note.id}`}> {note.name} </Link>
        <button onClick={() => deleteNote(note.id)}>delete</button>
      </>
    );
  };
  return <div className='note'>{filterNotes()}</div>;
};
export default withRouter(Note);
