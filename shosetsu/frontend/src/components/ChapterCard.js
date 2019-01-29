import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export default class ChapterCard extends PureComponent {
  static propTypes = {
    chapter: PropTypes.shape.isRequired,
    book: PropTypes.shape.isRequired,
    project: PropTypes.shape.isRequired
  };

  render() {
    const { chapter, book, project } = this.props;

    return (
      <NavLink
        to={`/project/${project.id}/book/${book.id}/chapter/${chapter.id}`}
        className="book-card"
      >
        <header>{chapter.title}</header>
        <p>
          Preview:
          {chapter.content_preview}
          ...
        </p>
      </NavLink>
    );
  }
}
