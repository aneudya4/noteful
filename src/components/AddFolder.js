import React from 'react';
import ErrorBoundary from './ErrorBoundary';

class AddFolder extends React.Component {
  state = {
    name: '',
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: this.state.name }),
    };
    await fetch('http://localhost:9090/folders', options)
      .then((response) => {
        if (!response.ok) {
          throw new Error('folder could not be added');
        }
        return response.json();
      })
      .then((response) => {
        this.setState({ name: '' });
        this.props.addNewFolder(response);
        this.props.history.push('/');
      });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <ErrorBoundary>
          <input
            type='text'
            onChange={(evt) => this.setState({ name: evt.target.value })}
            value={this.state.name}
          />
          <button>Add Folder</button>
        </ErrorBoundary>
      </form>
    );
  }
}
export default AddFolder;
