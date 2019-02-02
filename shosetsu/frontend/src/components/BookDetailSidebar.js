import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './styled/Sidebar';

const BookDetailSidebar = (props) => {
  const { book } = props;

  return (
    <Sidebar>
      <h2>Description</h2>
      <p>{book.description}</p>
      <h2>Notes</h2>
      <p>Additional Notes</p>
    </Sidebar>
  );
};

BookDetailSidebar.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookDetailSidebar;
