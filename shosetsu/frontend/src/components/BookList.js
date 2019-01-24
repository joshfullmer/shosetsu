import React, { Component } from 'react';
import axios from 'axios';

import BookCard from './BookCard';
import BookListToolbar from './BookListToolbar';
import BookListBreadcrumbs from './breadcrumbs/BookListBreadcrumbs';

export default class BookList extends Component {

  state = {
    books: [],
    project: {id: this.props.match.params.project_id},
    loading: true,
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/project/${this.state.project.id}/book/`)
      .then(response => {
        this.setState({
          books: response.data.books,
          project: response.data.project,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing book data', error)
      });
  }

  render() {
    let project = this.state.project

    return (
      <div className="booklist-body body">
        <BookListBreadcrumbs
          project={this.state.project}
          loading={this.state.loading}
        />
        <BookListToolbar {...this.props} />
        <main className="booklist-container">
          <div className="booklist">
            {(this.state.loading)
              ? <p>Loading...</p>
              : this.state.books.map(book =>
                  <BookCard
                    data={book}
                    key={book.id}
                    project={project}
                  />
                )
            }
          </div>
        </main>
      </div>
    );
  }
}