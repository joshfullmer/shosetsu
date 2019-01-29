import React from 'react';
import PropTypes from 'prop-types';

import AddBookModal from './modals/AddBookModal';
import AddElementModal from './modals/AddElementModal';

const ProjectDetailToolbar = (props) => {
  const { deleteProject } = props;
  return (
    <aside className="toolbar">
      <AddBookModal buttonClassName="" {...props} />
      <AddElementModal buttonClassName="" {...props} />
      <button type="button" onClick={deleteProject}>
        Delete
      </button>
    </aside>
  );
};

ProjectDetailToolbar.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default ProjectDetailToolbar;
