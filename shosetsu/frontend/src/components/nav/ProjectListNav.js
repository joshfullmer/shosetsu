import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ProjectListNav extends Component {
  render() {
    return (
      <div className="nav-item">
        <NavLink to='/project'>
          <span>Projects</span>
        </NavLink>
      </div>
    );
  }
}