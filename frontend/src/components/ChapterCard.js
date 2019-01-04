import React, { Component } from 'react';

export default class ChapterCard extends Component {
  render() {
    let chapter = this.props.data;
    return (
      <div className="book-card">
        <header>{chapter.title}</header>
        <p>Preview: {chapter.content_preview}...</p>
      </div>
    );
  }
}