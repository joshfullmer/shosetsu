import React, { Component } from 'react'

import AddChapterModal from './modals/AddChapterModal'

export default class BookDetailToolbar extends Component {
  render() {
    return (
      <aside className="toolbar">
        <AddChapterModal
          buttonClassName=""
          {...this.props}
        />
        <button onClick={this.props.delete}>Delete</button>
      </aside>
    )
  }
}