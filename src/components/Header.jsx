import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    loadingFunction: true,
    userName: {},
  };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const userName = await getUser();
    this.setState({
      userName: { ...userName },
      loadingFunction: false,
    });
  };

  render() {
    const { loadingFunction, userName } = this.state;
    return (
      <header data-testid="header-component">
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search"> Search </Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
          </li>
        </ul>
        { loadingFunction
          ? <Loading />
          : (
            <span data-testid="header-user-name">
              Olá,
              {userName.name}
            </span>

          )}

      </header>
    );
  }
}
