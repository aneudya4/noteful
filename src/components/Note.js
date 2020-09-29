import React from 'react';
export default (props) => {
  const findNote = () => {
    const note = props.notes.find(
      (note) => note.id === props.match.params.noteId
    );
    console.log(note);
    return (
      <div>
        <h1>{note.name}</h1>
        <p>{note.content}</p>
      </div>
    );
  };

  return (
    <div>
      {findNote()}
      <button onClick={() => props.history.goBack()}>go back</button>
    </div>
  );
};
