import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import BreadcrumbsHeader from './BreadcrumbsHeader';
import InlineEditText from '../inline-edit/InlineEditText';

export default class BookDetailBreadcrumbs extends PureComponent {
  static propTypes = {
    book: PropTypes.shape.isRequired,
    project: PropTypes.shape.isRequired,
    rename: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
  };

  render() {
    const {
      book, project, rename, loading
    } = this.props;

    return (
      <BreadcrumbsHeader className="hello">
        {loading ? (
          'Loading...'
        ) : (
          <>
            <NavLink to="/project">Projects</NavLink>
            <span> &gt; </span>
            <NavLink to={`/project/${project.id}`}>{project.title}</NavLink>
            <span> &gt; </span>
            <NavLink to={`/project/${project.id}/book`}>Books</NavLink>
            <span> &gt; </span>
            <InlineEditText tag="span" initialValue={book.title} handleSave={rename} />
          </>
        )}
      </BreadcrumbsHeader>
    );
  }
}
