import React, { Component } from 'react'

export default class ProjectDetailSidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <p>{this.props.project.description}</p>
        <h2>Notes</h2>
        <p>Additional Notes</p>
      </aside>
    )
  }
}