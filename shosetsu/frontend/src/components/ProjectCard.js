import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <NavLink to={`/project/${project.id}`} className="project-card">
      <header>{project.title}</header>
      <p>{project.description}</p>
    </NavLink>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectCard;
