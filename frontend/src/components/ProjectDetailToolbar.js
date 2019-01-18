import React, { Component } from 'react'
import AddBookModal from './modals/AddBookModal'
import AddElementModal from './modals/AddElementModal'

export default class ProjectDetailToolbar extends Component {
  render() {
    return (
      <aside className="toolbar">
        <AddBookModal
          buttonClassName=""
          {...this.props}
        />
        <AddElementModal
          buttonClassName=""
          {...this.props}
        />
        <button onClick={this.props.delete}>Delete</button>
      </aside>
    )
  }
}