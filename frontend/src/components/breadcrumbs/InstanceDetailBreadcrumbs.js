import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import BreadcrumbsHeader from './BreadcrumbsHeader';
import InlineEditText from '../inline-edit/InlineEditText';

export default class InstanceDetailBreadcrumbs extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    instance: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    updateInstanceName: PropTypes.func.isRequired
  };

  render() {
    const {
      project, element, instance, loading, updateInstanceName
    } = this.props;

    return (
      <BreadcrumbsHeader>
        {loading ? (
          'Loading...'
        ) : (
          <>
            <NavLink to="/project">Projects</NavLink>
            <span> &gt; </span>
            <NavLink to={`/project/${project.id}`}>{project.title}</NavLink>
            <span> &gt; </span>
            <NavLink to={`/project/${project.id}/element`}>Elements</NavLink>
            <span> &gt; </span>
            <NavLink to={`/project/${project.id}/element/${element.id}`}>{element.name}</NavLink>
            <span> &gt; </span>
            <InlineEditText
              tag="span"
              initialValue={instance.name}
              handleSave={updateInstanceName}
            />
          </>
        )}
      </BreadcrumbsHeader>
    );
  }
}
