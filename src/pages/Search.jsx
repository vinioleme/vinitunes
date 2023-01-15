import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    name: '',
    disable: true,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
      disable: value.length <= 1,
    });
  };

  handleClick = () => { };

  render() {
    const { name, disable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <label htmlFor="input-search">
          <input
            type="text"
            data-testid="search-artist-input"
            id="input-search"
            name={ name }
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

      </div>

    );
  }
}
