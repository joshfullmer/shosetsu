import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ProjectListNav extends Component {
  render() {
    return (
      <ul>
        <li>
          <NavLink to='/project'>
            Projects
          </NavLink>
        </li>
      </ul>
    );
  }
}