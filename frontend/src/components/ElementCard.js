import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ElementCardNavLink = styled(NavLink)`
  background-color: olivedrab;
`;

const ElementCard = (props) => {
  const { project, element } = props;

  return (
    <ElementCardNavLink to={`/project/${project.id}/element/${element.id}`}>
      <header>{element.name}</header>
    </ElementCardNavLink>
  );
};

ElementCard.propTypes = {
  project: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired
};

export default ElementCard;
