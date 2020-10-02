import React from 'react';

const NoteMainTitle = (props) => {
  return (
    <div className='main-title'>
      <button onClick={() => props.history.goBack()}>go back</button>
      <h1>{props.note.name}</h1>
    </div>
  );
};
export default NoteMainTitle;
