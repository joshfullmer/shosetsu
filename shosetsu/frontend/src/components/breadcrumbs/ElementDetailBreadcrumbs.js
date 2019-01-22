import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import InlineEditText from '../inline-edit/InlineEditText';

export default class ElementDetailBreadcrumbs extends Component {
  render() {
    let element = this.props.element
    let project = element.project
    return (
      <header className="title">
        {(this.props.loading)
          ? "Loading..."
          : <>
              <NavLink to='/project'>Projects</NavLink>
              <span> &gt; </span>
              <NavLink to={`/project/${project.id}`}>{project.title}</NavLink>
              <span> &gt; </span>
              <NavLink to={`/project/${project.id}/element`}>Elements</NavLink>
              <span> &gt; </span>
              <InlineEditText
                tag="span"
                initialValue={element.name}
                handleSave={this.props.updateElementName}
              />
            </>
        }
      </header>
    )
  }
}