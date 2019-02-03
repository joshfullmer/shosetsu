import React from 'react';
import PropTypes from 'prop-types';

import AddChapterModal from './modals/AddChapterModal';
import Toolbar from './styled/Toolbar';

const BookDetailToolbar = (props) => {
  const { deleteBook } = props;
  return (
    <Toolbar>
      <AddChapterModal {...props} />
      <button type="button" onClick={deleteBook}>
        Delete
      </button>
    </Toolbar>
  );
};

BookDetailToolbar.propTypes = {
  deleteBook: PropTypes.func.isRequired
};

export default BookDetailToolbar;
