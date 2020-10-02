import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Folders from './components/FoldersList';
import Sidebar from './components/Sidebar';
import ApiContext from './components/ApiContext';
import NoteList from './components/NoteList';
import NoteDetails from './components/NoteDetails';

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
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
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  render() {
    const { folders, notes } = this.state;
    const value = {
      notes,
      folders,
      deleteNote: this.handleDeleteNote,
    };
    return (
      <>
        <h1>
          <Link to='/'>Noteful</Link>
        </h1>
        <hr />
        <main>
          <ApiContext.Provider value={value}>
            <Sidebar className='aside'>
              {['/', '/folder/:folderId'].map((path, index) => (
                <Route exact path={path} key={index} component={Folders} />
              ))}

              {['/', '/folder/:folderId?'].map((path, index) => (
                <Route exact path={path} key={index} component={NoteList} />
              ))}

              <Route exact path='/notes/:noteId' component={NoteDetails} />
            </Sidebar>
          </ApiContext.Provider>
        </main>
      </>
    );
  }
}

export default App;
