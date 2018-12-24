import React, { Component } from 'react';

export default class Project extends Component {
  render() {
    return (
      <div className="project">
        <header>{this.props.data.title}</header>
        <p>{this.props.data.description}</p>
      </div>
    );
  }
}