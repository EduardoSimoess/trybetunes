import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './Carregando';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: '',
    };

    this.userContainer = this.userContainer.bind(this);
  }

  componentDidMount() {
    this.userContainer();
  }

  async userContainer() {
    // this.setState({ loading: true });
    const result = await getUser();
    this.setState({ user: result.name });
    this.setState({ loading: false });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? (<Loading />
          ) : (
            <div>
              <p data-testid="header-user-name">{user}</p>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </div>)}
      </header>
    );
  }
}

export default Header;
