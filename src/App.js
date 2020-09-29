import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Folders from './components/Folders';
import Sidebar from './components/Sidebar';
import NotesList from './components/NotesList';
import data from './store';
import Note from './components/Note';
import Button from './components/Button';

class App extends React.Component {
  state = {
    data: data,
  };
  render() {
    return (
      <>
        <h1>Noteful</h1>
        <hr />
        <main>
          <Sidebar className='aside'>
            <Route
              path='/:folderId?'
              render={(routerProps) => (
                <Folders folders={this.state.data.folders} {...routerProps} />
              )}
            />
            <Route path='/:folderId/:noteId' component={Button} />
          </Sidebar>
          <Route
            exact
            path='/:folderId?'
            render={(routerProps) => (
              <NotesList notes={this.state.data.notes} {...routerProps} />
            )}
          />
          <Route
            exact
            path='/note/:noteId'
            render={(routerProps) => (
              <Note notes={data.notes} {...routerProps} />
            )}
          />
        </main>
      </>
    );
  }
}

export default App;
