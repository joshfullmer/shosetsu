import React from 'react';
import PropTypes from 'prop-types';

const BookDetailSidebar = (props) => {
  const { book } = props;

  return (
    <aside className="sidebar">
      <h2>Description</h2>
      <p>{book.description}</p>
      <h2>Notes</h2>
      <p>Additional Notes</p>
    </aside>
  );
};

BookDetailSidebar.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookDetailSidebar;
