import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from './services/userAPI';
import Loading from './Carregando';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabledBol: true,
      name: '',
      status: undefined,
      loading: false,
    };
    this.ableLogin = this.ableLogin.bind(this);
    this.container = this.container.bind(this);
  }

  ableLogin({ target }) {
    const { value } = target;
    const min = 3;
    if (value.length >= min) {
      this.setState({ disabledBol: false });
      this.setState({ name: value });
    } else {
      this.setState({ disabledBol: true });
    }
  }

  async container() {
    this.setState({ loading: true });
    const { name } = this.state;
    const obj = { name };
    const user = await createUser(obj);
    console.log(user);
    this.setState({ status: user });
    this.setState({ loading: false });
  }

  render() {
    const { disabledBol, status, loading } = this.state;
    if (loading) return <Loading />;
    return (
      <div className="loginBody">
        { status ? (<Redirect to="/search" />
        ) : (
          <div data-testid="page-login" className="page">
            <form>
              <label htmlFor="login" className="login">
                User:
                <input
                  type="text"
                  id="login"
                  data-testid="login-name-input"
                  onChange={ this.ableLogin }
                  className="textInput"
                  placeholder="User"
                />
              </label>
              <label htmlFor="password" className="password">
                Password:
                <input
                  type="password"
                  id="password"
                  className="textInput"
                  placeholder="Password"
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disabledBol }
                onClick={ this.container }
                className="buttonLogin"
              >
                Entrar

              </button>
            </form>
            <img src="https://theme.zdassets.com/theme_assets/9633455/9814df697eaf49815d7df109110815ff887b3457.png" alt="trybe" className="loginImg" />
          </div>)}
      </div>

    );
  }
}

export default Login;
