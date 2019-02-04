import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InstanceCard from './InstanceCard';

const Elements = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-auto-rows: minmax(250px, auto);
  }
`;

export default class InstanceList extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired
  };

  render() {
    const { project, element } = this.props;

    return (
      <div>
        <NavLink to={`/project/${project.id}/element/${element.id}`}>
          <header>{element.name}</header>
        </NavLink>
        <Elements>
          {element.element_instances.map(instance => (
            <InstanceCard key={instance.id} instance={instance} {...this.props} />
          ))}
        </Elements>
      </div>
    );
  }
}
