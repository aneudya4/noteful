import React from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log('here error');
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <button>
          <Link to='/'>return to main page</Link>
        </button>
      );
    }
    return this.props.children;
  }
}
