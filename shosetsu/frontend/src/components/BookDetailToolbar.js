import React from 'react';
import PropTypes from 'prop-types';

import AddChapterModal from './modals/AddChapterModal';

const BookDetailToolbar = (props) => {
  const { deleteBook } = props;
  return (
    <aside className="toolbar">
      <AddChapterModal {...props} />
      <button type="button" onClick={deleteBook}>
        Delete
      </button>
    </aside>
  );
};

BookDetailToolbar.propTypes = {
  deleteBook: PropTypes.func.isRequired
};

export default BookDetailToolbar;
