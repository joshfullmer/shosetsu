import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectCardNavLink = styled(NavLink)`
  background-color: darkgray;
`;

const ProjectCard = (props) => {
  const { project } = props;

  return (
    <ProjectCardNavLink to={`/project/${project.id}`}>
      <header>{project.title}</header>
      <p>{project.description}</p>
    </ProjectCardNavLink>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired
};

export default ProjectCard;
