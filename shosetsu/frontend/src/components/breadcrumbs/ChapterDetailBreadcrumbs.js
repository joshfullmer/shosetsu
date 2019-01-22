import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import InlineEditText from '../inline-edit/InlineEditText'

export default class ChapterDetailBreadcrumbs extends Component {
  render() {
    let chapter = this.props.chapter
    let book = chapter.book
    let project = chapter.project
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
              <NavLink to={`/project/${project.id}/book/${book.id}`}>{book.title}</NavLink>
              <span> &gt; </span>
              <InlineEditText
                tag="span"
                initialValue={chapter.title}
                handleSave={this.props.updateChapterTitle}
              />
            </>
        }
      </header>
    )
  }
}