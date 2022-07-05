import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from './services/musicsAPI';
import MusicCard from './MusicCard';
import './album.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      artistDetail: '',
      music: [],
    };
    this.container = this.container.bind(this);
  }

  componentDidMount() {
    this.container();
  }

  async container() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const array = await getMusics(id);
    console.log(array);
    this.setState({ artistDetail: array[0] });
    const musicsArray = array.filter((music, index) => index > 0);
    console.log(musicsArray);
    this.setState({ music: musicsArray });
  }

  render() {
    const { artistDetail, music } = this.state;
    return (
      <div data-testid="page-album" className="pageAlbum">
        <Header />
        <div className="album">
          <p data-testid="artist-name">{artistDetail.artistName}</p>
          <img src={ artistDetail.artworkUrl60 } alt="cover" className="cover" />
          <p data-testid="album-name">{artistDetail.collectionName}</p>
        </div>
        <div className="songs">
          { music.map((song, index) => (
            <MusicCard value={ song } key={ index } />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
