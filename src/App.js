import React from 'react';
import { Route } from 'react-router-dom';
import FoldersList from './components/folder-list/FoldersList';
import NavigationBar from './components/navigation-bar/NavigationBar';
import NoteDetails from './components/note-details/NoteDetails';
import AddFolder from './components/add-folder/AddFolder';
import AddNote from './components/add-note/AddNote';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import NoteList from './components/note-list/NoteList';
import AppHeader from './components/app-header/AppHeader';
import ApiContext from './ApiContext';
import config from './config';
import './App.css';
import Spinner from './components/spinner/Spinner';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    hasError: false,
    isLoading: false,
  };

  async componentDidMount() {
    await this.getData('folders');
    await this.getData('notes');
  }

  getData = async (data) => {
    this.setState({ isLoading: true });
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
      },
    };
    await fetch(`${config.API_ENDPOINT}${data}`, options)
      .then((res) => res.json())
      .then((res) => this.setState({ [data]: res, isLoading: false }));
  };
  handleDeleteNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
      },
    };
    fetch(`${config.API_ENDPOINT}notes/${noteId}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong');
        }
        return res;
      })
      .then((res) => res.json())
      .then(() => {
        this.setState({
          notes: updatedNotes,
        });
      })
      .catch(() => {
        this.setState({
          hasError: true,
        });
      });
    this.setState({
      notes: updatedNotes,
    });
  };

  addNewNote = (note) => {
    const newNoteState = [...this.state.notes, note];
    this.setState({ notes: newNoteState });
  };

  addNewFolder = (folder) => {
    const newFolderState = [...this.state.folders, folder];
    this.setState({ folders: newFolderState });
  };

  renderMainRoutes() {
    return (
      <>
        {['/', '/folders/:folderId'].map((path, index) => (
          <Route
            exact
            path={path}
            key={index}
            render={(routerProps) => <FoldersList {...routerProps} />}
          />
        ))}
      </>
    );
  }

  renderNotesRoutes() {
    return (
      <div className='notes-container'>
        {['/', '/folders/:folderId'].map((path, index) => (
          <Route
            exact
            path={path}
            key={index}
            render={(routerProps) => <NoteList {...routerProps} />}
          />
        ))}
        <ErrorBoundary>
          <Route exact path='/notes/:noteId' component={NoteDetails} />
          <Route
            exact
            path='/add-folder'
            render={(routerProps) => (
              <AddFolder {...routerProps} addNewFolder={this.addNewFolder} />
            )}
          />
          <Route
            exact
            path='/add-note'
            render={(routerProps) => (
              <AddNote
                {...routerProps}
                folders={this.state.folders}
                addNewNote={this.addNewNote}
              />
            )}
          />
        </ErrorBoundary>
      </div>
    );
  }

  render() {
    const { folders, notes, isLoading } = this.state;
    const value = {
      notes,
      folders,
      deleteNote: this.handleDeleteNote,
    };
    return (
      <>
        <AppHeader />
        <main>
          <ApiContext.Provider value={value}>
            {isLoading ? (
              <Spinner />
            ) : (
              <NavigationBar className='aside'>
                <ErrorBoundary>{this.renderMainRoutes()}</ErrorBoundary>
              </NavigationBar>
            )}
            {!isLoading && this.renderNotesRoutes()}
          </ApiContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
