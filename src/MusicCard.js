import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from './services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = ({ favorite: false });
    this.check = this.check.bind(this);
    this.contain = this.contain.bind(this);
  }

  componentDidMount() {
    this.contain();
  }

  async contain() {
    const { value } = this.props;
    const { favorite } = this.state;
    if (favorite === true) {
      const favorita = await addSong(value);
      console.log(favorita);
    }
  }

  check() {
    const { favorite } = this.state;
    if (favorite === true) {
      this.setState({ favorite: false });
    } else {
      this.setState({ favorite: true });
    }
  }

  render() {
    const { value } = this.props;
    const { previewUrl, trackName, trackId } = value;
    return (
      <div>
        <p>{trackName}</p>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            onChange={ this.check }
            data-testid={ `checkbox-music-${trackId}` }
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
