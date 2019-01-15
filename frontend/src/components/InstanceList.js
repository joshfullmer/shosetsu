import React, { Component } from 'react';
import InstanceCard from './InstanceCard';

export default class InstanceList extends Component {
  render() {
    let element = this.props.element;

    return (
      <div>
        <p>{element.name}</p>
        <div className="elementlist">
          {element.element_instances.map(instance =>
            <InstanceCard
              key={instance.id}
              instance={instance}
            />
          )}
        </div>
      </div>
    );
  }
}