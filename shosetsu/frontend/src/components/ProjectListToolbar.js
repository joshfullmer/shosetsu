import React, { Component } from 'react'
import AddProjectModal from './modals/AddProjectModal';

export default class ProjectListToolbar extends Component {
  render() {
    return (
      <aside className="toolbar">
        <AddProjectModal
          {...this.props}
        />
      </aside>
    )
  }
}