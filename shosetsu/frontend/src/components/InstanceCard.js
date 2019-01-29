import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const InstanceCard = (props) => {
  const { project, element, instance } = props;

  return (
    <NavLink
      to={`/project/${project.id}/element/${element.id}/instance/${instance.id}`}
      className="instance-card"
    >
      <header>{instance.name}</header>
    </NavLink>
  );
};

InstanceCard.propTypes = {
  project: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired,
  instance: PropTypes.object.isRequired
};

export default InstanceCard;
