import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from './services/userAPI';
import Loading from './Carregando';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = ({
      loading: false,
      usersData: '',
    });
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    console.log(user);
    this.setState({ usersData: user });
    this.setState({ loading: false });
  }

  render() {
    const { loading, usersData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? (<Loading />) : (
          <div>
            <p>{usersData.name}</p>
            <p>{usersData.email}</p>
            <p>{usersData.description}</p>
            <img src={ usersData.image } alt="Profile" data-testid="profile-image" />
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
