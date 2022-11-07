import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from './services/userAPI';
import Loading from './Carregando';
import './profile.css';

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
      <div data-testid="page-profile" className="page-profile">
        <Header />
        { loading ? (<Loading />) : (
          <div>
            <div className="album">
              <Link to="/profile/edit" className="edit">Editar perfil</Link>
              <img
                src={ usersData.image }
                alt="Profile"
                data-testid="profile-image"
                className="profilePicture"
              />
              <p className="title">User:</p>
              <p className="trackName">{`${usersData.name}`}</p>
              <p className="title">Email:</p>
              <p className="trackName">{`${usersData.email}`}</p>
              <p className="title">Description:</p>
              <p className="trackName">{`${usersData.description}`}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
