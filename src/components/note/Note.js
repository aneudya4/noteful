import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';
const Note = ({ note, match }) => {
  const { deleteNote } = useContext(ApiContext);
  const filterNotes = () => {
    if (match.params.folderId) {
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

Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  deleteNote: PropTypes.func,
};
