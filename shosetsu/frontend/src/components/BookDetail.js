import React, { Component } from 'react';
import axios from 'axios';

import ChapterCard from './ChapterCard';
import BookDetailToolbar from './BookDetailToolbar';
import BookDetailSidebar from './BookDetailSidebar';
import BookDetailBreadcrumbs from './breadcrumbs/BookDetailBreadcrumbs';

export default class BookDetail extends Component {

  state = {
    book: {id: this.props.match.params.book_id},
    project_id: this.props.match.params.project_id,
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/project/${this.state.project_id}/book/${this.state.book.id}/`)
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

  rename = title => {
    let book = this.state.book
    let data = {
      id: book.project.id,
      title: title
    }
    axios.patch(`http://127.0.0.1:8000/api/project/${book.project.id}/book/${book.id}/`, data)
      .then(() => {
        this.setState(prevState => ({
          book: {
            ...prevState.book,
            title: title
          }
        }))
      })
      .catch(error => {
        console.log('Error renaming book', error)
      })
  }

  delete = () => {
    axios.delete(`http://127.0.0.1:8000/api/project/${this.state.project_id}/book/${this.state.book.id}/`)
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
        <BookDetailBreadcrumbs
          book={book}
          rename={this.rename}
          loading={this.state.loading}
        />
        <BookDetailToolbar {...this.props} delete={this.delete}/>
        <main className="bookview-container">
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
        {/* TODO: update sidebar to edit description */}
        <BookDetailSidebar book={book} loading={this.state.loading} />
      </div>
    );
  }
}