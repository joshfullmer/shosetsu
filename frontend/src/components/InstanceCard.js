import React, { Component } from 'react';

export default class InstanceCard extends Component {
  render() {
    let instance = this.props.instance;

    return (
      <div className="instance-card">
        <header>{instance.name}</header>
      </div>
    );
  }
}