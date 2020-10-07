import React from 'react';
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='error'>
          <p>An Error Occured</p>
          <button>
            <a href='/'>return to main page</a>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
