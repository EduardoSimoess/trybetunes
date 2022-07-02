import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import Loading from './Carregando';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      disabledBol: true,
      music: '',
      loading: false,
      albuns: [],
      notFound: false,
    };
    this.ableSearch = this.ableSearch.bind(this);
    this.search = this.search.bind(this);
    this.conditional = this.conditional.bind(this);
  }

  ableSearch({ target }) {
    this.setState({ notFound: false });
    const { value } = target;
    const min = 2;
    this.setState({ music: value });
    if (value.length >= min) {
      this.setState({ disabledBol: false });
    } else {
      this.setState({ disabledBol: true });
    }
  }

  async search() {
    this.setState({ loading: true });
    const { music, albuns } = this.state;
    const response = await searchAlbumsAPI(music);
    console.log(response);
    this.setState({ music: '' });
    this.setState({ albuns: response }, this.conditional);
    console.log(albuns.length);
    this.setState({ disabledBol: true });
    this.setState({ loading: false });
  }

  conditional() {
    const { albuns } = this.state;
    if (albuns.length === 0) {
      this.setState({ notFound: true });
    } else {
      this.setState({ notFound: false });
    }
  }

  render() {
    const { disabledBol, music, loading, albuns, notFound } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="search" className="search">
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ this.ableSearch }
            value={ music }
          />
        </label>
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ disabledBol }
          onClick={ this.search }
        >
          Pesquisar

        </button>
        { notFound ? <p>Nenhum álbum foi encontrado</p> : ''}
        { loading ? <Loading /> : (
          albuns.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt="Album cover" />
              <h3>{ album.collectionName}</h3>
              <p>{album.artistName}</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Detalhes do Album

              </Link>
            </div>))
        )}
      </div>
    );
  }
}

export default Search;
