import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    user: '',
    isButtonDisabled: true,
    loading: false,
  };

  onInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
    const numberThree = 3;
    if (value.length >= numberThree) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  };

  buttonSubmit = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      await createUser({ name: user });
      history.push('/search');
    });
  };

  render() {
    const { user, isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading ? <p>Carregando...</p> : (
          <form>
            <label htmlFor="user">
              Nome
              <input
                type="text"
                data-testid="login-name-input"
                name="user"
                id="user"
                value={ user }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ this.buttonSubmit }
            >
              Entrar

            </button>
          </form>

        ) }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

export default Login;
