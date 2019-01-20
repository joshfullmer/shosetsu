import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import InstanceCard from './InstanceCard';

export default class InstanceList extends Component {
  render() {
    let element = this.props.element;

    return (
      <div>
        <NavLink to={`/project/${element.project_id}/element/${element.id}`}>
          <header>{element.name}</header>
        </NavLink>
        <div className="elementlist">
          {element.element_instances.map(instance =>
            <InstanceCard
              key={instance.id}
              instance={instance}
              {...this.props}
            />
          )}
        </div>
      </div>
    );
  }
}