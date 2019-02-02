import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './styled/Sidebar';

const ChapterDetailSidebar = (props) => {
  const { chapter } = props;
  return (
    <Sidebar>
      <h2>Notes</h2>
      <p>{chapter.notes}</p>
    </Sidebar>
  );
};

ChapterDetailSidebar.propTypes = {
  chapter: PropTypes.object.isRequired
};

export default ChapterDetailSidebar;
