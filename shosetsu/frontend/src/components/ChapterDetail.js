import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ChapterDetailToolbar from './ChapterDetailToolbar';
import ChapterDetailSidebar from './ChapterDetailSidebar';
import ChapterDetailBreadcrumbs from './breadcrumbs/ChapterDetailBreadcrumbs';

export default class ChapterDetail extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    project: { id: this.props.match.params.project_id },
    // eslint-disable-next-line react/destructuring-assignment
    book: { id: this.props.match.params.book_id },
    // eslint-disable-next-line react/destructuring-assignment
    chapter: { id: this.props.match.params.chapter_id },
    loading: true
  };

  componentDidMount() {
    const { project, book, chapter } = this.state;
    const { history } = this.props;
    axios
      .get(`http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/chapter/${chapter.id}/`)
      .then((response) => {
        this.setState({
          project: response.data.project,
          book: response.data.book,
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

  deleteChapter = () => {
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
        <ChapterDetailToolbar deleteChapter={this.deleteChapter} />
      </div>
    );
  }
}
