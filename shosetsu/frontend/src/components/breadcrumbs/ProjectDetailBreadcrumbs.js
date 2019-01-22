import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import InlineEditText from '../inline-edit/InlineEditText'

export default class ProjectDetailBreadcrumbs extends Component {
  render() {
    return (
      <header className="title">
        <NavLink to='/project'>Projects</NavLink>
        <span> &gt; </span>
        <InlineEditText
          tag="span"
          initialValue={this.props.project.title}
          handleSave={this.props.rename}
        />
      </header>
    )
  }
}