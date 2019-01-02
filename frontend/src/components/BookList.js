import React, { Component } from 'react';
import axios from 'axios';

import BookCard from './BookCard';

export default class BookList extends Component {

  state = {
    books: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/books/')
      .then(response => {
        console.log(response.data);
        this.setState({
          books: response.data,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }

  render() {
    return (
      <main className="books-container">
        <h2>Books</h2>
        <div className="books">
          {(this.state.loading)
            ? <p>Loading...</p>
            : this.state.books.map(book =>
              <BookCard
                data={book}
                key={book.id}
              />
            )
          }
        </div>
      </main>
    );
  }
}