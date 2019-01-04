import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Nav extends Component {
  render() {
    return (
      <nav>
        Navigation
        <ul className="nav-list">
          <li><NavLink to='/books'>Books</NavLink></li>
          <li>Outlines</li>
          <li>Characters</li>
          <li>Places</li>
        </ul>
      </nav>
    );
  }
}