import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Note from '../note/Note';
import ApiContext from '../../ApiContext';
import './noteList.css';
const NoteList = () => {
  const { notes } = useContext(ApiContext);
  const renderNotes = () => {
    return notes.map((note) => (
      <Note
        key={note.id}
        id={note.id}
        name={note.name}
        folderId={note.folderid}
      />
    ));
  };

  return (
    <div className='notes'>
      <Link to='../add-note'>Add Note</Link>
      {renderNotes()}
    </div>
  );
};
export default NoteList;
NoteList.defaultProps = {
  notes: [],
};
