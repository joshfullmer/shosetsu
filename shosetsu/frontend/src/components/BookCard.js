import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const BookCard = (props) => {
  const { project, book } = props;

  return (
    <NavLink to={`/project/${project.id}/book/${book.id}`} className="book-card">
      <header>{book.title}</header>
      <p>{book.description}</p>
      <footer>
        <span>Project Title:</span>
        {project.title}
      </footer>
    </NavLink>
  );
};

BookCard.propTypes = {
  project: PropTypes.object.isRequired,
  book: PropTypes.object.isRequired
};

export default BookCard;
