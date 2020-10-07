import React from 'react';
import './noteMainTitle.css';
import PropTypes from 'prop-types';

const NoteMainTitle = ({ note, history }) => {
  return (
    <div className='main-title'>
      <h2>{note.name}</h2>
      <button onClick={() => history.goBack()}>go back</button>
    </div>
  );
};
export default NoteMainTitle;

NoteMainTitle.propTypes = {
  name: PropTypes.string.isRequired,
};
