import React, { Component } from 'react';

import Book from './Book';

export default class BookList extends Component {
  render() {
    return (
      <main className="books-container">
        <h2>Books</h2>
        <div className="books">
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
          <Book />
        </div>
      </main>
    );
  }
}