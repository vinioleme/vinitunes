import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  state = {
    user: '',
    disable: true,
    load: false,
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      user: value,
      disable: value.length <= 2,
    });
  };

  handleClick = (event) => {
    const { user } = this.state;
    const { history } = this.props;
    event.preventDefault();
    this.setState({ load: true }, () => createUser({ name: user })
      .then(() => { history.push('/search'); }));
  };

  render() {
    const { user, disable, load } = this.state;
    return (
      <div>
        { load === false
          ? (
            <div data-testid="page-login">
              <h2>Login</h2>
              <label htmlFor="name-Login">
                <input
                  id="name-Login"
                  data-testid="login-name-input"
                  name={ user }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ disable }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </div>
          )
          : <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};
