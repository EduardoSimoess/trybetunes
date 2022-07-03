import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from './services/favoriteSongsAPI';
import Loading from './Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = ({
      favorite: false,
      loading: false,
    });
    this.handleCheck = this.handleCheck.bind(this);
    this.fav = this.fav.bind(this);
  }

  handleCheck({ target }) {
    const { checked } = target;
    this.setState({ favorite: checked }, this.fav);
  }

  async fav() {
    const { value } = this.props;
    const { favorite } = this.state;
    if (favorite === true) {
      this.setState({ loading: true });
      await addSong(value);
      this.setState({ loading: false });
    }
  }

  render() {
    const { value } = this.props;
    const { previewUrl, trackName, trackId } = value;
    const { loading, favorite } = this.state;
    return (
      <div>
        {loading
          ? (<Loading />
          ) : (
            <div>
              <p>{trackName}</p>
              <label htmlFor="favorite">
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.handleCheck }
                  checked={ favorite }
                />
              </label>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  value: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired,
  }).isRequired,

};

export default MusicCard;
