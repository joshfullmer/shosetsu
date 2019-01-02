import React, { Component } from 'react'

export default class Title extends Component {
  render() {
    let title = this.props.title ? this.props.title : "Header Placeholder";
    return (
      <header className="title">{title}</header>
    );
  }
}