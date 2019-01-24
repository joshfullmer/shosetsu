import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class ElementListBreadcrumbs extends Component {
  render() {
    let project = this.props.project;

    return (
      <header className="title">
        {(this.props.loading)
          ? "Loading..."
          : <>
              <NavLink to='/project'>Projects</NavLink>
              <span> &gt; </span>
              <NavLink to={`/project/${project.id}`}>{project.title}</NavLink>
              <span> &gt; </span>
              <span>Elements</span>
            </>
        }
      </header>
    )
  }
}