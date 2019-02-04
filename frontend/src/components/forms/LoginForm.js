import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    username: '',
    password: ''
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  login = (e) => {
    const { handleLogin, history } = this.props;
    handleLogin(e, this.state, () => history.push('/project'));
  };

  render() {
    const { username, password } = this.state;
    return (
      <form onSubmit={this.login}>
        <h4>Log In</h4>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
    );
  }
}
