import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class BookListBreadcrumbs extends Component {
  render() {
    let books = this.props.books;
    let project;
    if (books !== undefined && books.length > 0) {
      project = books[0].project
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
              <span>Books</span>
            </>
        }
      </header>
    )
  }
}