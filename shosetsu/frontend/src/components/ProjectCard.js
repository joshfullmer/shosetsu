import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ProjectCard extends Component {
  render() {
    let project = this.props.data;

    return (
      <NavLink to={`/project/${project.id}`} className="project-card">
        <header>{project.title}</header>
        <p>{project.description}</p>
      </NavLink>
    );
  }
}