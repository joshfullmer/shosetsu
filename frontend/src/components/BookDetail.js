import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Title from './Title';
import ChapterCard from './ChapterCard';
import BookDetailToolbar from './BookDetailToolbar';
import BookDetailSidebar from './BookDetailSidebar';

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
        this.props.removeBookFromProject({id: this.state.book.id})
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
        <Title title={(this.state.loading) ? "Loading..." : book.title} />
        <BookDetailToolbar {...this.props} delete={this.delete}/>
        <main className="bookview-container">
          <p>Project: {!this.state.loading && <NavLink to={`/project/${book.project.id}`}>{book.project.title}</NavLink>}</p>
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
        </main>
        <BookDetailSidebar book={book} loading={this.state.loading} />
      </div>
    );
  }
}