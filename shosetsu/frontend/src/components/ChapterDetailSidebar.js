import React from 'react';
import PropTypes from 'prop-types';

const ChapterDetailSidebar = (props) => {
  const { chapter } = props;
  return (
    <aside className="sidebar">
      <h2>Notes</h2>
      <p>{chapter.notes}</p>
    </aside>
  );
};

ChapterDetailSidebar.propTypes = {
  chapter: PropTypes.object.isRequired
};

export default ChapterDetailSidebar;
