import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

export default class Header extends Component {
  state = {
    userName: '',
    load: true,
  };

  componentDidMount() {
    getUser()
      .then(({ name }) => this.setState({ userName: name, load: false }));
  }

  render() {
    const { userName, load } = this.state;
    return (
      <div>
        {load ? <Loading />
          : (
            <div data-testid="header-component">
              <h1>Header</h1>
              <span data-testid="header-user-name">{`Bem Vindo, ${userName}`}</span>
            </div>
          )}
      </div>
    );
  }
}
