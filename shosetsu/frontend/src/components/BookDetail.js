import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import ChapterCard from './ChapterCard';
import BookDetailToolbar from './BookDetailToolbar';
import BookDetailSidebar from './BookDetailSidebar';
import BookDetailBreadcrumbs from './breadcrumbs/BookDetailBreadcrumbs';

export default class BookDetail extends Component {
  static propTypes = {
    removeBookFromProject: PropTypes.func.isRequired,
    history: PropTypes.shape.isRequired,
    match: PropTypes.shape.isRequired
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
      .get(`http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/`)
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
      .patch(`http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/`, data)
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
      .delete(`http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/`)
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
      <div className="bookview-body body">
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
        <main className="bookview-container">
          <div className="book-chapters">
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
          </div>
        </main>
        {/* TODO: update sidebar to edit description */}
        <BookDetailSidebar book={book} loading={loading} />
      </div>
    );
  }
}
