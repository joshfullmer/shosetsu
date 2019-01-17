import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Title from './Title';
import ChapterCard from './ChapterCard';
import AddChapterModal from './modals/AddChapterModal';

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
        if (error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching book data', error);
      });
  }

  delete = () => {
    axios.delete(`http://127.0.0.1:8000/project/${this.state.project_id}/book/${this.state.book.id}/`)
      .then(() => {
        this.props.history.push(`/project/${this.state.project_id}/`);
      })
      .catch(error => {
        console.log('Error deleting book', error)
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
          <p>Project: {!this.state.loading && <NavLink to={`/project/${book.project.id}`}>{book.project.title}</NavLink>}</p>
          <AddChapterModal
            buttonClassName=""
            {...this.props}
          />
          <div className="book-chapters">
            {(this.state.loading)
              ? <p>Loading...</p>
              : book.chapters.map(chapter =>
                <ChapterCard
                  data={chapter}
                  key={chapter.id}
                  project={book.project}
                  book={book}
                />
              )
            }
          </div>
          <button onClick={this.delete}>Delete</button>
        </main>
      </div>
    );
  }
}