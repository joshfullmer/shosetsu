import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const ChapterCardNavLink = styled(NavLink)`
  background-color: rosybrown;
`;

export default class ChapterCard extends PureComponent {
  static propTypes = {
    chapter: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
  };

  render() {
    const { chapter, book, project } = this.props;

    return (
      <ChapterCardNavLink to={`/project/${project.id}/book/${book.id}/chapter/${chapter.id}`}>
        <header>{chapter.title}</header>
        <p>
          Preview:
          {chapter.content_preview}
          ...
        </p>
      </ChapterCardNavLink>
    );
  }
}
