import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    artist: '',
    collection: '',
    selectedMusic: [],
  };

  componentDidMount() {
    this.handleAlbum();
  }

  handleAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const foundedMusic = await getMusics(id);
    this.setState({
      artist: foundedMusic[0].artistName,
      collection: foundedMusic[0].collectionName,
      selectedMusic: foundedMusic,
    });
  };

  render() {
    const { artist, collection, selectedMusic } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="album-name">{ collection }</p>
        <p data-testid="artist-name">{ artist }</p>
        <MusicCard selectedMusic={ selectedMusic } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
