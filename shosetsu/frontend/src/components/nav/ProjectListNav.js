import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import NavItem from './NavItem';

export default class ProjectListNav extends Component {
  render() {
    return (
      <NavItem key="project">
        <NavLink to='/project'>
          <span>Projects</span>
        </NavLink>
      </NavItem>
    );
  }
}