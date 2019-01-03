import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Title from './Title';

export default class BookView extends Component {

  state = {
    book: {},
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/books/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          book: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching project data', error);
      });
  }

  render() {
    let book = this.state.book;
    return(
      <div className="bookview-body body">
        <Title title={`Book View #${this.props.match.params.id}`} />
        <main className="bookview-container">
          <h2>Book view for Book #{this.props.match.params.id}</h2>
          <p>Title: {book.title}</p>
          <p>Description: {book.description}</p>
          <p>Project: <NavLink to={`/projects/${book.project_id}`}>{book.project_title}</NavLink></p>
        </main>
      </div>
    );
  }
}