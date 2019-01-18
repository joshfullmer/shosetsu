import React, { Component } from 'react'
import AddBookModal from './modals/AddBookModal';

export default class BookListToolbar extends Component {
  render() {
    return (
      <aside className="toolbar">
        <AddBookModal {...this.props} />
      </aside>
    )
  }
}