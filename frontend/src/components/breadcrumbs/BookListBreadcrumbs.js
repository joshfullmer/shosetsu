import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import BreadcrumbsHeader from './BreadcrumbsHeader';

export default class BookListBreadcrumbs extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    const { project, loading } = this.props;

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
            <span>Books</span>
          </>
        )}
      </BreadcrumbsHeader>
    );
  }
}
