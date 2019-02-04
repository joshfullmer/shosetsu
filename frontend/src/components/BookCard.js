import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BookCardNavLink = styled(NavLink)`
  background-color: brown;
`;

export default class BookCard extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired
  };

  render() {
    const { project, book } = this.props;

    return (
      <BookCardNavLink to={`/project/${project.id}/book/${book.id}`}>
        <header>{book.title}</header>
        <p>{book.description}</p>
        <footer>
          <span>Project Title:</span>
          {project.title}
        </footer>
      </BookCardNavLink>
    );
  }
}
