import React from 'react';
import PropTypes from 'prop-types';

import Sidebar from './styled/Sidebar';

const ProjectDetailSidebar = (props) => {
  const { project } = props;
  return (
    <Sidebar>
      <p>{project.description}</p>
      <h2>Notes</h2>
      <p>Additional Notes</p>
    </Sidebar>
  );
};

ProjectDetailSidebar.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectDetailSidebar;
