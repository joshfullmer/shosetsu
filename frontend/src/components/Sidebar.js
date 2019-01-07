import React, { Component } from 'react'

export default class Sidebar extends Component {
  render() {
    let title = this.props.title ? this.props.title : "Sidebar"
    return (
      <aside>
        {title}
      </aside>
    );
  }
}