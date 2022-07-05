import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './services/userAPI';
import Loading from './Carregando';
import './header.css';

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
            <div className="header">
              <img src="https://go.betrybe.com/hubfs/logo%20cortada%20branca.png" alt="trybe" className="headerImg" />
              <Link
                to="/search"
                data-testid="link-to-search"
                className="links"
              >
                Search

              </Link>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
                className="links"
              >
                Favorites

              </Link>
              <Link
                to="/profile"
                data-testid="link-to-profile"
                className="links"
              >
                Profile

              </Link>
              <div className="user">
                <img src="https://media-exp1.licdn.com/dms/image/C4D03AQHi32K6PhDgZQ/profile-displayphoto-shrink_200_200/0/1616004234546?e=1662595200&v=beta&t=sbFey-dO-a3N9G2eY0hbOVthpir_qCIbiGkJHOR4wKw" alt="Usuário" className="userPic" />
                <p data-testid="header-user-name" className="usersName">{user}</p>
              </div>
            </div>)}
      </header>
    );
  }
}

export default Header;
