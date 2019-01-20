import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ChapterCard extends Component {
  render() {
    let chapter = this.props.data;
    let book = this.props.book;
    let project = this.props.project;

    return (
      <NavLink to={`/project/${project.id}/book/${book.id}/chapter/${chapter.id}`} className="book-card">
        <header>{chapter.title}</header>
        <p>Preview: {chapter.content_preview}...</p>
      </NavLink>
    );
  }
}