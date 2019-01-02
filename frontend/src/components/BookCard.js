import React, { Component } from 'react';

export default class BookCard extends Component {
  render() {
    let book = this.props.data; 

    return (
      <div className="book-card">
        <header>{book.title}</header>
        <p>{book.description}</p>
        <footer>{book.project_title}</footer>
      </div>
    );
  }
}