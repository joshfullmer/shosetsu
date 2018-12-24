import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Logo extends Component {
  render() {
    return (
      <header className="logo"><NavLink exact to='/'>小説</NavLink></header>
    );
  }
}