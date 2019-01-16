import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ElementCard extends Component {
  render() {
    let project = this.props.project;
    let element = this.props.element;

    return (
      <NavLink to={`/project/${project.id}/element/${element.id}`} className="element-card">
        <header>{element.name}</header>
      </NavLink>
    );
  }
}