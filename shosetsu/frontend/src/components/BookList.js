import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import BookCard from './BookCard';
import BookListToolbar from './BookListToolbar';
import BookListBreadcrumbs from './breadcrumbs/BookListBreadcrumbs';

export default class BookList extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    project: { id: this.props.match.params.project_id },
    books: [],
    loading: true
  };

  componentDidMount() {
    const { project } = this.state;
    axios
      .get(`http://127.0.0.1:8000/api/project/${project.id}/book/`)
      .then((response) => {
        this.setState({
          books: response.data.books,
          project: response.data.project,
          loading: false
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing book data', error);
      });
  }

  render() {
    const { project, books, loading } = this.state;

    return (
      <div className="booklist-body body">
        <BookListBreadcrumbs project={project} loading={loading} />
        <BookListToolbar {...this.props} project={project} />
        <main className="booklist-container">
          <div className="booklist">
            {loading ? (
              <p>Loading...</p>
            ) : (
              books.map(book => <BookCard book={book} key={book.id} project={project} />)
            )}
          </div>
        </main>
      </div>
    );
  }
}
