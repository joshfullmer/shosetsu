import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class BookCard extends Component {
  render() {
    let book = this.props.data; 

    return (
      <NavLink to={`/books/${book.id}`} className="book-card">
        <header>{book.title}</header>
        <p>{book.description}</p>
        <footer>Project Title: {book.project_title}</footer>
      </NavLink>
    );
  }
}