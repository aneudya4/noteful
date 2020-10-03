import React from 'react';
import ValidationError from './ValidationError';
import { withRouter, Link } from 'react-router-dom';
class AddNote extends React.Component {
  state = {
    name: '',
    content: '',
    folder: 'Important',
    isNoteNameValid: true,
  };

  validateName = () => {
    if (!this.state.name) {
      this.setState({ isNoteNameValid: false });
      return false;
    }
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
            throw new Error();
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.props.addNewNote(data);
          this.props.history.push('/');
        })
        .catch((err) => console.log(err));
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
    return (
      <div className='AddNote form'>
        <Link to='/'>
          <button>back</button>
        </Link>
        <form className='AddNote' onSubmit={(e) => this.onNoteSubmit(e)}>
          <label htmlFor='noteName' name='name'>
            name your note:
          </label>
          <input
            type='text'
            id='noteName'
            onChange={this.onInputChange}
            name='name'
            value={this.state.name}
          />
          {!this.state.isNoteNameValid && (
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
          <button type='submit'>Add</button>
        </form>
      </div>
    );
  }
}
export default withRouter(AddNote);
