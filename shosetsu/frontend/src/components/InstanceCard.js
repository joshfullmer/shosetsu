import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class InstanceCard extends Component {
  render() {
    let instance = this.props.instance;

    return (
      <NavLink to={`/project/${this.props.match.params.project_id}/element/${this.props.element.id}/instance/${instance.id}`} className="instance-card">
        <header>{instance.name}</header>
      </NavLink>
    );
  }
}