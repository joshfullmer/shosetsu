import React, { Component } from 'react';

export default class Book extends Component {
  render() {
    return (
      <div className="book">
        <header>{this.props.data.title}</header>
        <p>{this.props.data.description}</p>
        <footer>{this.props.data.project_title}</footer>
      </div>
    );
  }
}