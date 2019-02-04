import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChapterCard from './ChapterCard';
import BookDetailToolbar from './BookDetailToolbar';
import BookDetailSidebar from './BookDetailSidebar';
import BookDetailBreadcrumbs from './breadcrumbs/BookDetailBreadcrumbs';
import Body from './styled/Body';
import Main from './styled/Main';

axios.defaults.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

const BookDetailBody = styled(Body)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: inherit;
  grid-template-areas:
    'title'
    'main'
    'sidebar'
    'toolbar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: inherit;
    grid-template-areas:
      'title toolbar'
      'main sidebar'
      'main sidebar';
  }
`;

const BookDetailContainer = styled(Main)``;

const BookChapters = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-auto-rows: minmax(250px, auto);
  }
`;

export default class BookDetail extends Component {
  static propTypes = {
    removeBookFromProject: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    project: { id: this.props.match.params.project_id },
    // eslint-disable-next-line react/destructuring-assignment
    book: { id: this.props.match.params.book_id },
    loading: true
  };

  componentDidMount() {
    const { book, project, history } = this.state;
    axios
      .get(`/api/project/${project.id}/book/${book.id}/`)
      .then((response) => {
        this.setState({
          book: response.data,
          project: response.data.project,
          loading: false
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error fetching book data', error);
      });
  }

  rename = (title) => {
    const { project, book } = this.state;
    const data = {
      id: book.id,
      title
    };
    axios
      .patch(`/api/project/${project.id}/book/${book.id}/`, data)
      .then(() => {
        this.setState(prevState => ({
          book: {
            ...prevState.book,
            title
          }
        }));
      })
      .catch((error) => {
        console.log('Error renaming book', error);
      });
  };

  deleteBook = () => {
    const { removeBookFromProject, history } = this.props;
    const { book, project } = this.state;
    axios
      .delete(`/api/project/${project.id}/book/${book.id}/`)
      .then(() => {
        removeBookFromProject({ id: book.id });
        history.push(`/project/${project.id}/`);
      })
      .catch((error) => {
        console.log('Error deleting book', error);
      });
  };

  render() {
    const { book, project, loading } = this.state;

    return (
      <BookDetailBody>
        <BookDetailBreadcrumbs
          project={project}
          book={book}
          rename={this.rename}
          loading={loading}
        />
        <BookDetailToolbar
          {...this.props}
          project={project}
          book={book}
          deleteBook={this.deleteBook}
        />
        <BookDetailContainer>
          <BookChapters>
            {loading ? (
              <p>Loading...</p>
            ) : (
              book.chapters.map(chapter => (
                <ChapterCard
                  chapter={chapter}
                  key={chapter.id}
                  project={book.project}
                  book={book}
                />
              ))
            )}
          </BookChapters>
        </BookDetailContainer>
        {/* TODO: update sidebar to edit description */}
        <BookDetailSidebar book={book} loading={loading} />
      </BookDetailBody>
    );
  }
}
