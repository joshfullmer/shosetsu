import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import InlineEditText from '../inline-edit/InlineEditText';
import BreadcrumbsHeader from './BreadcrumbsHeader';

export default class ElementDetailBreadcrumbs extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    updateElementName: PropTypes.func.isRequired
  };

  render() {
    const {
      project, element, loading, updateElementName
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
            <InlineEditText tag="span" initialValue={element.name} handleSave={updateElementName} />
          </>
        )}
      </BreadcrumbsHeader>
    );
  }
}
