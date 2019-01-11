import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Title from './Title';
import ChapterCard from './ChapterCard';

export default class BookDetail extends Component {

  state = {
    book: {id: this.props.match.params.book_id},
    project_id: this.props.match.params.project_id,
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.state.project_id}/book/${this.state.book.id}/`)
      .then(response => {
        this.setState({
          book: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching book data', error);
      });
  }

  render() {
    let book = this.state.book;

    return(
      <div className="bookview-body body">
        <Title title={`Book View #${book.id}`} />
        <main className="bookview-container">
          <h2>Book view for Book #{book.id}</h2>
          <p>Title: {book.title}</p>
          <p>Description: {book.description}</p>
          <p>Project: <NavLink to={`/projects/${book.project_id}`}>{book.project_title}</NavLink></p>
          <div className="book-chapters">
            {(this.state.loading)
              ? <p>Loading...</p>
              : book.chapters.map(chapter =>
                <ChapterCard
                  data={chapter}
                  key={chapter.id}
                  project_id={this.state.project_id}
                  book_id={book.id}
                />
              )
            }
          </div>
        </main>
      </div>
    );
  }
}