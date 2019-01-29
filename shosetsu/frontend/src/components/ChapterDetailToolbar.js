import React from 'react';
import PropTypes from 'prop-types';

const ChapterDetailToolbar = (props) => {
  const { deleteChapter } = props;
  return (
    <aside className="toolbar">
      <button type="button" onClick={deleteChapter}>
        Delete
      </button>
    </aside>
  );
};

ChapterDetailToolbar.propTypes = {
  deleteChapter: PropTypes.func.isRequired
};

export default ChapterDetailToolbar;
