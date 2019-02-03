import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InstanceCardNavLink = styled(NavLink)`
  background-color: darkolivegreen;
`;

const InstanceCard = (props) => {
  const { project, element, instance } = props;

  return (
    <InstanceCardNavLink
      to={`/project/${project.id}/element/${element.id}/instance/${instance.id}`}
    >
      <header>{instance.name}</header>
    </InstanceCardNavLink>
  );
};

InstanceCard.propTypes = {
  project: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  instance: PropTypes.object.isRequired
};

export default InstanceCard;
