import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import ApiContext from '../../ApiContext';
const Note = ({ id, name, folderId, match }) => {
  const { deleteNote } = useContext(ApiContext);
  const filterNotes = () => {
    if (match.params.folderId) {
      return (
        folderId === match.params.folderId && (
          <>
            <Link to={`/notes/${id}`}> {name} </Link>
            <button onClick={() => deleteNote(id)}>delete</button>
          </>
        )
      );
    }
    return (
      <>
        <Link to={`/notes/${id}`}> {name} </Link>
        <button onClick={() => deleteNote(id)}>delete</button>
      </>
    );
  };
  return <div className='note'>{filterNotes()}</div>;
};
export default withRouter(Note);

Note.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  folderId: PropTypes.string.isRequired,
  deleteNote: PropTypes.func,
};
