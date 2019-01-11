import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class BookCard extends Component {
  render() {
    let book = this.props.data;
    let project = this.props.project;
    console.log(project);
    return (
      <NavLink to={`/project/${project.id}/book/${book.id}`} className="book-card">
        <header>{book.title}</header>
        <p>{book.description}</p>
        <footer>Project Title: {project.title}</footer>
      </NavLink>
    );
  }
}