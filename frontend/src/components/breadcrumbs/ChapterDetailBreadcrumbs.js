import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import InlineEditText from '../inline-edit/InlineEditText';
import BreadcrumbsHeader from './BreadcrumbsHeader';

export default class ChapterDetailBreadcrumbs extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    chapter: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    updateChapterTitle: PropTypes.func.isRequired
  };

  render() {
    const {
      project, book, chapter, loading, updateChapterTitle
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
            <NavLink to={`/project/${project.id}/book`}>Books</NavLink>
            <span> &gt; </span>
            <NavLink to={`/project/${project.id}/book/${book.id}`}>{book.title}</NavLink>
            <span> &gt; </span>
            <InlineEditText
              tag="span"
              initialValue={chapter.title}
              handleSave={updateChapterTitle}
            />
          </>
        )}
      </BreadcrumbsHeader>
    );
  }
}
