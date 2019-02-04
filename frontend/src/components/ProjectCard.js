import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ProjectCardNavLink = styled(NavLink)`
  background-color: darkgray;
`;

export default class ProjectCard extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired
  };

  render() {
    const { project } = this.props;

    return (
      <ProjectCardNavLink to={`/project/${project.id}`}>
        <header>{project.title}</header>
        <p>{project.description}</p>
      </ProjectCardNavLink>
    );
  }
}
