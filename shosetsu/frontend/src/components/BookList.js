import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BookCard from './BookCard';
import BookListToolbar from './BookListToolbar';
import BookListBreadcrumbs from './breadcrumbs/BookListBreadcrumbs';
import Body from './styled/Body';
import Main from './styled/Main';

const BookListBody = styled(Body)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: inherit;
  grid-template-areas:
    'title'
    'main'
    'toolbar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: inherit;
    grid-template-areas:
      'title toolbar'
      'main main'
      'main main';
  }
`;

const BookListContainer = styled(Main)`
  overflow: auto;
`;

const Books = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-auto-rows: minmax(250px, auto);
  }
`;

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
      <BookListBody>
        <BookListBreadcrumbs project={project} loading={loading} />
        <BookListToolbar {...this.props} project={project} />
        <BookListContainer>
          <Books>
            {loading ? (
              <p>Loading...</p>
            ) : (
              books.map(book => <BookCard book={book} key={book.id} project={project} />)
            )}
          </Books>
        </BookListContainer>
      </BookListBody>
    );
  }
}
