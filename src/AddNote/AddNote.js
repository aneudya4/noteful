import React, { Component } from 'react';
import ValidationError from '../validation-error/ValdiationError';
import NotefulForm from '../NotefulForm/NotefulForm';
import ApiContext from '../ApiContext';
import config from '../config';
import './AddNote.css';

export default class AddNote extends Component {
  state = {
    hasError: false,
  };
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;

  isInputValid(name, content, folderid) {
    return name.trim() !== '' && content.trim() !== '' && folderid !== '...';
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderid: e.target['note-folder-id'].value,
      modified: new Date(),
    };

    if (!this.isInputValid(newNote.name, newNote.content, newNote.folderid)) {
      this.setState({ hasError: true });
      return;
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folderid}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { hasError } = this.state;
    const { folders = [] } = this.context;

    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>Name</label>
            <input type='text' id='note-name-input' name='note-name' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>Content</label>
            <textarea id='note-content-input' name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>Folder</label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          {hasError && <ValidationError error='Complete All fields' />}

          <div className='buttons'>
            <button type='submit'>Add note</button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}
