import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChapterDetailToolbar from './ChapterDetailToolbar';
import ChapterDetailSidebar from './ChapterDetailSidebar';
import ChapterDetailBreadcrumbs from './breadcrumbs/ChapterDetailBreadcrumbs';
import Body from './styled/Body';
import Main from './styled/Main';

const ChapterDetailBody = styled(Body)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: inherit;
  grid-template-areas:
    'title'
    'content'
    'toolbar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: inherit;
    grid-template-areas:
      'title toolbar'
      'content content'
      'content content';
  }
`;

const ChapterDetailContainer = styled(Main)`
  padding: 0;
  overflow: overlay;
  grid-area: content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'main'
    'sidebar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-areas: 'main sidebar';
  }
`;

const ChapterEditor = styled.div`
  padding: 0.85em;
  white-space: pre-line;
`;

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
      <ChapterDetailBody>
        <ChapterDetailBreadcrumbs
          project={project}
          book={book}
          chapter={chapter}
          updateChapterTitle={this.updateChapterTitle}
          loading={loading}
        />
        <ChapterDetailContainer>
          <ChapterEditor contentEditable suppressContentEditableWarning>
            {chapter.content}
          </ChapterEditor>
          <ChapterDetailSidebar chapter={chapter} />
        </ChapterDetailContainer>
        <ChapterDetailToolbar deleteChapter={this.deleteChapter} />
      </ChapterDetailBody>
    );
  }
}
