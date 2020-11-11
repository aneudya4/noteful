import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import PropTypes from 'prop-types';

import './forms.css';
import ValidationError from '../validation-error/ValidationError';
class AddFolder extends React.Component {
  state = {
    name: '',
    isFolderNameValid: true,
    hasError: false,
  };

  validateFolderName = () => {
    if (!this.state.name) {
      this.setState({ isFolderNameValid: false });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.validateFolderName()) {
      return;
    } else {
      this.postData(this.state.name);
    }
  };
  postData = (name) => {
    console.log(config.API_ENDPOINT);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`,
      },

      body: JSON.stringify({ name }),
    };

    fetch(`${config.API_ENDPOINT}folders`, options)
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
      })
      .catch((e) => {
        this.setState({ hasError: true });
      });
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
      <form className='add-folder' onSubmit={this.onSubmit}>
        <label htmlFor='folder'>Create Folder</label>
        <input
          type='text'
          onChange={(evt) => this.setState({ name: evt.target.value })}
          value={this.state.name}
          id='folder'
        />
        <button>Add Folder</button>
        {!this.state.isFolderNameValid && (
          <ValidationError error='folder name cant be empty' />
        )}
      </form>
    );
  }
}
export default AddFolder;
AddFolder.propTypes = {
  addNewFolder: PropTypes.func.isRequired,
};
