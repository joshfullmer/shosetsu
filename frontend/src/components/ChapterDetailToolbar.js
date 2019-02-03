import React from 'react';
import PropTypes from 'prop-types';

import Toolbar from './styled/Toolbar';

const ChapterDetailToolbar = (props) => {
  const { deleteChapter } = props;
  return (
    <Toolbar>
      <button type="button" onClick={deleteChapter}>
        Delete
      </button>
    </Toolbar>
  );
};

ChapterDetailToolbar.propTypes = {
  deleteChapter: PropTypes.func.isRequired
};

export default ChapterDetailToolbar;
