import React, { Component } from 'react';

export default class ProjectCard extends Component {
  render() {
    let project = this.props.data;

    return (
      <div className="project-card">
        <header>{project.title}</header>
        <p>{project.description}</p>
      </div>
    );
  }
}