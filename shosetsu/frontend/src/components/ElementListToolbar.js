import React, { Component } from 'react'

import AddElementModal from './modals/AddElementModal'

export default class ElementListToolbar extends Component {
  render () {
    return (
      <aside className="toolbar">
        <AddElementModal
            buttonClassName=""
            {...this.props}
          />
      </aside>
    )
  }
}