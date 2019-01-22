import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import InlineEditText from '../inline-edit/InlineEditText';

export default class BookDetailBreadcrumbs extends Component {
  render() {
    let book = this.props.book
    let project;
    if (book) {
      project = book.project
    }

    return (
      <header className="title">
        {(this.props.loading)
          ? "Loading..."
          : <>
              <NavLink to='/project'>Projects</NavLink>
              <span> &gt; </span>
              <NavLink to={`/project/${project.id}`}>{project.title}</NavLink>
              <span> &gt; </span>
              <NavLink to={`/project/${project.id}/book`}>Books</NavLink>
              <span> &gt; </span>
              <InlineEditText
                tag="span"
                initialValue={book.title}
                handleSave={this.props.rename}
              />
            </>
        }
      </header>
    )
  }
}