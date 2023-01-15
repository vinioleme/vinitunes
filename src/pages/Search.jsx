import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    name: '',
    secondName: '',
    disable: true,
    load: false,
    arrayAlbum: [],
    message: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
      disable: value.length <= 1,
    });
  };

  handleClick = (e) => {
    const { name } = this.state;
    e.preventDefault();
    this.setState({ load: true }, () => searchAlbumsAPI(name)
      .then((response) => this.setState({
        load: false,
        secondName: `Resultado de álbuns de: ${name}`,
        message: true,
        arrayAlbum: response,
        name: '',
      })));
  };

  albumRender = () => {
    const { load, arrayAlbum, message } = this.state;
    if (load) {
      return <Loading />;
    }
    return (arrayAlbum?.length === 0 && message
      ? <span>Nenhum álbum foi encontrado</span>
      : (
        <div>
          {arrayAlbum
            .map(({ collectionId, collectionName, artistName, artworkUrl100 }, ind) => (
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
                key={ collectionId }
              >
                <img src={ artworkUrl100 } alt={ collectionName } />
                <span>{`Album ${ind + 1}`}</span>
                <span>{ collectionName }</span>
                <span>{ artistName }</span>
              </Link>
            ))}
        </div>
      ));
  };

  render() {
    const { name, secondName, disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="input-search">
          <input
            type="text"
            data-testid="search-artist-input"
            id="input-search"
            name={ name }
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disable }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        <span>{ secondName }</span>
        {this.albumRender()}

      </div>

    );
  }
}
