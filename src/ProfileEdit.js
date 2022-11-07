import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { updateUser, getUser } from './services/userAPI';
import Loading from './Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = ({
      name: '',
      email: '',
      image: '',
      description: '',
      disable: true,
      redirect: false,
      loading: false,
    });
    this.saveData = this.saveData.bind(this);
    this.save = this.save.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const inicalData = await getUser();
    const { name, email, image, description } = inicalData;
    this.setState({ name });
    this.setState({ image });
    this.setState({ email });
    this.setState({ description });
    this.setState({ loading: false });
  }

  saveData({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, this.ableButton);
  }

  ableButton() {
    const { name, email, image, description } = this.state;
    if (name.length > 0 && email.length > 0 && image.length > 0
      && description.length > 0 && email.includes('@') && email.includes('.com')) {
      this.setState({ disable: false });
    } else {
      this.setState({ disable: true });
    }
  }

  async save() {
    this.setState({ loading: true });
    const { name, email, image, description } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
    };
    await updateUser(obj);
    this.setState({ redirect: true });
    this.setState({ loading: false });
  }

  render() {
    const { disable, redirect, name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        { loading ? (<Loading />) : (
          <form className="form">
            <label htmlFor="name" className="input">
              <p className="login">Name:</p>
              <input
                type="text"
                name="name"
                onChange={ this.saveData }
                value={ name }
                data-testid="edit-input-name"
                className="textInput"
              />
            </label>
            <label htmlFor="email" className="input">
              <p className="login">Email:</p>
              <input
                type="text"
                name="email"
                onChange={ this.saveData }
                value={ email }
                data-testid="edit-input-email"
                className="textInput"
              />
            </label>
            <label htmlFor="description" className="input">
              <p className="login">Descição:</p>
              <input
                type="text"
                name="description"
                onChange={ this.saveData }
                value={ description }
                data-testid="edit-input-description"
                className="textInput"
              />
            </label>
            <label htmlFor="image" className="input">
              <p className="login">Profile picture:</p>
              <input
                type="text"
                name="image"
                onChange={ this.saveData }
                value={ image }
                data-testid="edit-input-image"
                className="textInput"
              />
            </label>

            <button
              type="button"
              disabled={ disable }
              onClick={ this.save }
              data-testid="edit-button-save"
              className="buttonLogin"
            >
              Save

            </button>
          </form>
        )}
        { redirect ? <Redirect to="/profile" /> : '' }
      </div>
    );
  }
}

export default ProfileEdit;
