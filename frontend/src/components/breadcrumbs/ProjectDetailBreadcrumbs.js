import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import InlineEditText from '../inline-edit/InlineEditText';
import BreadcrumbsHeader from './BreadcrumbsHeader';

export default class ProjectDetailBreadcrumbs extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    rename: PropTypes.func.isRequired
  };

  render() {
    const { project, loading, rename } = this.props;
    return (
      <BreadcrumbsHeader>
        <NavLink to="/project">Projects</NavLink>
        <span> &gt; </span>
        {loading ? (
          'Loading...'
        ) : (
          <InlineEditText tag="span" initialValue={project.title} handleSave={rename} />
        )}
      </BreadcrumbsHeader>
    );
  }
}
