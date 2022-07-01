import React from 'react';
import { getUser } from './services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: '',
    };

    this.userContainer = this.userContainer.bind(this);
  }

  async userContainer() {
    // this.setState({ loading: true });
    const name = await getUser();
    this.setState({ user: name });
    this.setState({ loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component" onLoad={ this.userContainer }>
        { loading ? <h1>Carregando...</h1> : <h1>{user}</h1>}
      </header>
    );
  }
}

export default Header;
