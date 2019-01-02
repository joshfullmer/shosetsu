import React, { Component } from 'react';
import axios from 'axios';

import BookCard from './BookCard';
import Title from './Title';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

export default class BookList extends Component {

  state = {
    books: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/books/')
      .then(response => {
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
      <div className="booklist-body body">
        <Title title="Book List" />
        <main className="booklist-container">
          <h2>Books</h2>
          <div className="booklist">
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
        <Sidebar />
        <Toolbar />
      </div>
    );
  }
}