import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const ElementCard = (props) => {
  const { project, element } = props;

  return (
    <NavLink to={`/project/${project.id}/element/${element.id}`} className="element-card">
      <header>{element.name}</header>
    </NavLink>
  );
};

ElementCard.propTypes = {
  project: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired
};

export default ElementCard;
