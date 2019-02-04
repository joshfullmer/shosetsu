import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InstanceCardNavLink = styled(NavLink)`
  background-color: darkolivegreen;
`;

export default class InstanceCard extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired
  };

  render() {
    const { project, element, instance } = this.props;

    return (
      <InstanceCardNavLink
        to={`/project/${project.id}/element/${element.id}/instance/${instance.id}`}
      >
        <header>{instance.name}</header>
      </InstanceCardNavLink>
    );
  }
}
