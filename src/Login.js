import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from './services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      disabledBol: true,
      name: '',
      status: undefined,
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
    this.setState({ status: 'Carregando' });
    const { name } = this.state;
    const obj = { name };
    await createUser(obj);
    const user = await createUser(obj);
    console.log(user);
    this.setState({ status: user });
  }

  render() {
    const { disabledBol, status } = this.state;
    if (status === 'Carregando') return 'Carregando...';
    // if (status === 'OK') return <Redirect to="/search" />;
    return (
      <div>
        { status ? (<Redirect to="/search" />
        ) : (
          <div data-testid="page-login">
            <form>
              <label htmlFor="login" className="login">
                User:
                <input
                  type="text"
                  id="login"
                  data-testid="login-name-input"
                  onChange={ this.ableLogin }
                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ disabledBol }
                onClick={ this.container }
              >
                Entrar

              </button>
            </form>
          </div>)}
      </div>

    );
  }
}

export default Login;
