import React, { Component } from 'react'

export default class ChapterDetailSidebar extends Component {
  render() {
    return (
      <aside className="sidebar">
        <h2>Notes</h2>
        <p>{this.props.chapter.notes}</p>
      </aside>
    )
  }
}