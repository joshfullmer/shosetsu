import React, { Component } from 'react'

export default class ChapterDetailToolbar extends Component {
  render() {
    return (
      <aside className="toolbar">
        <button onClick={this.props.delete}>Delete</button>
      </aside>
    )
  }
}