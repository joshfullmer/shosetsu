import React, { Component } from 'react'

import AddFieldModal from './modals/AddFieldModal'
import AddInstanceModal from './modals/AddInstanceModal'

export default class ElementDetailToolbar extends Component {
  render () {
    return (
      <aside className="toolbar">
        <AddFieldModal 
            buttonClassName=""
            {...this.props}
          />
          <AddInstanceModal
            buttonClassName=""
            {...this.props}
          />
          <button onClick={this.delete}>Delete</button>
      </aside>
    )
  }
}