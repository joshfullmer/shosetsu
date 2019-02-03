import React from 'react';
import { NavLink } from 'react-router-dom';

import NavItem from '../styled/NavItem';

export default function ProjectListNav() {
  return (
    <NavItem key="project">
      <NavLink to="/project">
        <span>Projects</span>
      </NavLink>
    </NavItem>
  );
}
