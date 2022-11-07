import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import Loading from './Carregando';
import './search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      disabledBol: true,
      music: '',
      loading: false,
      albuns: [],
      notFound: false,
      artist: '',
      print: false,
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
    this.setState({ artist: value });
    if (value.length >= min) {
      this.setState({ disabledBol: false });
    } else {
      this.setState({ disabledBol: true });
    }
  }

  async search() {
    const { music, albuns, notFound, artist } = this.state;
    console.log(artist);
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(music);
    console.log(response);
    this.setState({ music: '' });
    this.setState({ albuns: response }, this.conditional);
    if (notFound === false) {
      this.setState({ print: true });
    }
    console.log(artist);
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
    const { disabledBol, music, loading, albuns, notFound, print, artist } = this.state;
    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        <div className="searchForm">
          <div className="search">
            <label htmlFor="search">
              {/* <p className="buscar">Search</p> */}
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.ableSearch }
                value={ music }
                className="inputArtist"
                placeholder="Search for a music, album or artist"
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ disabledBol }
              onClick={ this.search }
              className="searchButton"
            >
              Search

            </button>
          </div>
          { print ? (
            <p className="results">
              {`Resultado de álbuns de ${artist}`}
            </p>
          ) : (
            '')}
          { notFound ? <p className="results">Nenhum álbum foi encontrado</p> : ''}
          <div className="albuns">
            { loading ? <Loading /> : (
              albuns.map((album) => (
                <div key={ album.collectionId } className="album">
                  <h3>{ album.collectionName}</h3>
                  <img src={ album.artworkUrl100 } alt="Album cover" className="cover" />
                  <p>{album.artistName}</p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="detailsLink"
                  >
                    Album details

                  </Link>
                </div>))
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
