import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: true,
    favoriteMusic: [],
  };

  componentDidMount() {
    this.getMusics();
  }

  favoriteSongsSaved = async (music, { target: { checked } }) => {
    this.setState({ loading: true });
    if (checked) {
      await addSong(music);
      await this.getMusics();
    } else {
      await removeSong(music);
      await this.getMusics();
    }
  };

  getMusics = async () => {
    const response = await getFavoriteSongs();
    this.setState({
      favoriteMusic: response,
      loading: false,
    });
  };

  render() {
    const { selectedMusic } = this.props;
    const { loading, favoriteMusic } = this.state;
    return (
      <div>
        {loading ? <p>Carregando...</p>
          : selectedMusic.filter((music) => music.previewUrl).map((music) => (
            <div key={ music.trackId }>
              { music.trackName }
              <audio
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ music.trackId }>
                <input
                  type="checkbox"
                  id={ music.trackId }
                  onChange={ (event) => this.favoriteSongsSaved(music, event) }
                  checked={ favoriteMusic
                    .some((element) => element.trackId === music.trackId) }
                  data-testid={ `checkbox-music-${music.trackId}` }
                />
                Favorita
              </label>
            </div>
          ))}
      </div>
    );
  }
}

export default MusicCard;

MusicCard.propTypes = {
  selectedMusic: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
