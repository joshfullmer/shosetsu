import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ChapterDetailToolbar from './ChapterDetailToolbar';
import ChapterDetailSidebar from './ChapterDetailSidebar';
import ChapterDetailBreadcrumbs from './breadcrumbs/ChapterDetailBreadcrumbs';

export default class ChapterDetail extends Component {
  static propTypes = {
    match: PropTypes.shape.isRequired,
    history: PropTypes.shape.isRequired
  };

  state = {
    get project() {
      const { match } = this.props;
      return { id: match.params.project_id };
    },
    get book() {
      const { match } = this.props;
      return { id: match.params.book_id };
    },
    get chapter() {
      const { match } = this.props;
      return { id: match.params.chapter_id };
    },
    loading: true
  };

  componentDidMount() {
    const { project, book, chapter } = this.state;
    const { history } = this.props;
    axios
      .get(`http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/chapter/${chapter.id}/`)
      .then((response) => {
        this.setState({
          chapter: response.data,
          loading: false
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error fetching chapter data', error);
      });
  }

  updateChapterTitle = (title) => {
    const { history } = this.props;
    const { project, book, chapter } = this.state;
    const data = {
      id: chapter.id,
      title
    };
    axios
      .patch(
        `http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/chapter/${chapter.id}/`,
        data
      )
      .then(() => {
        this.setState(prevState => ({
          chapter: {
            ...prevState.chapter,
            title
          }
        }));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error fetching chapter data', error);
      });
  };

  delete = () => {
    const { project, book, chapter } = this.state;
    const { history } = this.props;
    axios
      .delete(
        `http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/chapter/${chapter.id}/`
      )
      .then(() => {
        history.push(`/project/${project.id}/book/${book.id}/`);
      })
      .catch((error) => {
        console.log('Error deleting book', error);
      });
  };

  render() {
    const {
      project, book, chapter, loading
    } = this.state;

    return (
      <div className="chapter-body body">
        <ChapterDetailBreadcrumbs
          project={project}
          book={book}
          chapter={chapter}
          updateChapterTitle={this.updateChapterTitle}
          loading={loading}
        />
        <div className="chapter-content">
          <main className="chapter-editor" contentEditable suppressContentEditableWarning>
            {chapter.content}
          </main>
          <ChapterDetailSidebar chapter={chapter} />
        </div>
        <ChapterDetailToolbar delete={this.delete} />
      </div>
    );
  }
}
