import React from 'react';
import Loading from './Carregando';
import Header from './Header';
import { getFavoriteSongs } from './services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = ({
      favSongs: [],
      loading: false,
    });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const songsArray = await getFavoriteSongs();
    this.setState({ favSongs: songsArray });
    this.setState({ loading: false });
  }

  componentDidUpdate() {
    console.log('oi');
  }

  render() {
    const { favSongs, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? (<Loading />)
          : (favSongs.map((song, index) => (
            <MusicCard value={ song } key={ index } />
          ))) }
      </div>
    );
  }
}

export default Favorites;
