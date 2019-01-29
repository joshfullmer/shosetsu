import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import InstanceCard from './InstanceCard';

const InstanceList = (props) => {
  const { project, element } = props;

  return (
    <div>
      <NavLink to={`/project/${project.id}/element/${element.id}`}>
        <header>{element.name}</header>
      </NavLink>
      <div className="elementlist">
        {element.element_instances.map(instance => (
          <InstanceCard key={instance.id} instance={instance} {...this.props} />
        ))}
      </div>
    </div>
  );
};

InstanceList.propTypes = {
  project: PropTypes.object.isRequired,
  element: PropTypes.object.isRequired
};

export default InstanceList;
