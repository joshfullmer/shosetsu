import React, { Component } from 'react'

export default class BookDetailSidebar extends Component {
  render() {
    let book = this.props.book

    return (
      <aside className="sidebar">
        <h2>Description</h2>
        <p>{book.description}</p>
        <h2>Notes</h2>
        <p>Additional Notes</p>
      </aside>
    )
  }
}