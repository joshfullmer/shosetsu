import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class BookCard extends Component {
  render() {
    let book = this.props.data;
    let project_id = this.props.project_id

    return (
      <NavLink to={`/project/${project_id}/book/${book.id}`} className="book-card">
        <header>{book.title}</header>
        <p>{book.description}</p>
        <footer>Project Title: {book.project.title}</footer>
      </NavLink>
    );
  }
}