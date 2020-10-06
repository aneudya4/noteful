import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import FoldersList from './components/folder-list/FoldersList';
import NavigationBar from './components/navigation-bar/NavigationBar';
import ApiContext from './components/ApiContext';
import NoteDetails from './components/note-details/NoteDetails';
import AddFolder from './components/add-folder/AddFolder';
import AddNote from './components/add-note/AddNote';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import NoteList from './components/note-list/NoteList';
import AppHeader from './components/app-header/AppHeader';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    hasError: false,
  };

  async componentDidMount() {
    await this.getData('folders');
    await this.getData('notes');
  }

  getData = async (data) => {
    await fetch(`http://localhost:9090/${data}`)
      .then((res) => res.json())
      .then((res) => this.setState({ [data]: res }));
  };
  handleDeleteNote = (noteId) => {
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);

    const options = {
      method: 'DELETE',
    };
    fetch(`http://localhost:9090/notes/${noteId}`, options)
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
        {['/', '/folder/:folderId'].map((path, index) => (
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
        {['/', '/folder/:folderId'].map((path, index) => (
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
    const { folders, notes } = this.state;
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
            <NavigationBar className='aside'>
              <ErrorBoundary>{this.renderMainRoutes()}</ErrorBoundary>
            </NavigationBar>

            {this.renderNotesRoutes()}
          </ApiContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
