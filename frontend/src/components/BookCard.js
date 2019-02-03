import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BookCardNavLink = styled(NavLink)`
  background-color: brown;
`;

const BookCard = (props) => {
  const { project, book } = props;

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
};

BookCard.propTypes = {
  project: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired
};

export default BookCard;
