import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class ChapterCard extends Component {
  render() {
    let chapter = this.props.data;
    return (
      <NavLink to={`/chapters/${chapter.id}`} className="book-card">
        <header>{chapter.title}</header>
        <p>Preview: {chapter.content_preview}...</p>
      </NavLink>
    );
  }
}