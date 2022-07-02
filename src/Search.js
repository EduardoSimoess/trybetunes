import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      disabledBol: true,
    };
    this.ableSearch = this.ableSearch.bind(this);
  }

  ableSearch({ target }) {
    const { value } = target;
    const min = 2;
    if (value.length >= min) {
      this.setState({ disabledBol: false });
    } else {
      this.setState({ disabledBol: true });
    }
  }

  render() {
    const { disabledBol } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search" className="search">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.ableSearch }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabledBol }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
