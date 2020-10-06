import React from 'react';
import './addNote.css';
import PropTypes from 'prop-types';

import ValidationError from '../validation-error/ValidationError';
import { Link } from 'react-router-dom';
class AddNote extends React.Component {
  state = {
    name: '',
    content: '',
    folder: 'Important',
    invalidInput: false,
    hasError: false,
  };

  validateName = () => {
    if (!this.state.name) {
      this.setState({ isNoteNameValid: true });
      return false;
    }
    this.setState({ isNoteNameValid: false });

    return true;
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  findFolderByName = (folderName) => {
    const folder = this.props.folders.find(
      (folder) => folder.name === folderName
    );

    return folder.id;
  };

  onNoteSubmit(event) {
    event.preventDefault();
    const { name, content, folder } = this.state;
    if (!this.validateName()) {
      return;
    } else {
      const newNote = {
        name,
        folderId: this.findFolderByName(folder),
        content,
        modified: new Date(),
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote),
      };
      fetch('http://localhost:9090/notes', options)
        .then((response) => {
          if (!response.ok) {
            throw new Error('could not be added');
          }
          return response.json();
        })
        .then((data) => {
          this.props.addNewNote(data);
          this.props.history.push('/');
        })
        .catch((err) => {
          this.setState({ hasError: true });
        });
    }
  }
  renderFoldersOptions = () => {
    const { folders } = this.props;
    return folders.map((folder) => (
      <option key={folder.id} value={folder.name}>
        {folder.name}
      </option>
    ));
  };
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>An Error has Occured , try again later</p>
          <Link to='/'>Go Back</Link>
        </div>
      );
    }
    return (
      <div className='add-note-container'>
        <form className='add-note' onSubmit={(e) => this.onNoteSubmit(e)}>
          <label htmlFor='noteName' name='name'>
            Title for your note:
          </label>
          <input
            type='text'
            id='noteName'
            onChange={this.onInputChange}
            name='name'
            value={this.state.name}
          />
          {this.state.isNoteNameValid && (
            <ValidationError error='input cant be blank' />
          )}
          <br />
          <label htmlFor='noteContent'>contents of note: </label>
          <br />
          <textarea
            name='content'
            value={this.state.content}
            id='noteContent'
            onChange={this.onInputChange}
          ></textarea>
          <br />
          <label htmlFor='folderChoice'>choose a folder</label>
          <select
            id='folderChoice'
            name='folder'
            value={this.state.folder}
            onChange={this.onInputChange}
          >
            {this.renderFoldersOptions()}
          </select>
          <button type='submit'>Add new note</button>
        </form>
        <button className='btn' onClick={() => this.props.history.goBack()}>
          Go back
        </button>
      </div>
    );
  }
}
export default AddNote;

AddNote.propTypes = {
  addNewNote: PropTypes.func,
};