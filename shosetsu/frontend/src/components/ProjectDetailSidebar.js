import React from 'react';
import PropTypes from 'prop-types';

const ProjectDetailSidebar = (props) => {
  const { project } = props;
  return (
    <aside className="sidebar">
      <p>{project.description}</p>
      <h2>Notes</h2>
      <p>Additional Notes</p>
    </aside>
  );
};

ProjectDetailSidebar.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectDetailSidebar;
