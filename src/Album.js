import React from 'react';
import Header from './Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Albuns</h1>
      </div>
    );
  }
}

export default Album;
