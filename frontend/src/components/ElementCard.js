import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ElementCardNavLink = styled(NavLink)`
  background-color: olivedrab;
`;

export default class ElementCard extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired
  };

  render() {
    const { project, element } = this.props;

    return (
      <ElementCardNavLink to={`/project/${project.id}/element/${element.id}`}>
        <header>{element.name}</header>
      </ElementCardNavLink>
    );
  }
}
