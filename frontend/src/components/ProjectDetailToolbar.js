import React from 'react';
import PropTypes from 'prop-types';

import AddBookModal from './modals/AddBookModal';
import AddElementModal from './modals/AddElementModal';
import Toolbar from './styled/Toolbar';

const ProjectDetailToolbar = (props) => {
  const { deleteProject } = props;
  return (
    <Toolbar>
      <AddBookModal {...props} />
      <AddElementModal {...props} />
      <button type="button" onClick={deleteProject}>
        Delete
      </button>
    </Toolbar>
  );
};

ProjectDetailToolbar.propTypes = {
  deleteProject: PropTypes.func.isRequired
};

export default ProjectDetailToolbar;
