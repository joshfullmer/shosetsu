import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title';
import BookCard from './BookCard';

export default class ProjectView extends Component {

  state = {
    project: {},
    loading: true
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/projects/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          project: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching project data', error);
      });
  }

  render() {
    let project = this.state.project;
    return (
      <div className="projectview-body body">
        <Title title={`Project ID #${this.props.match.params.id}`} />
        <main className="projectview-container">
          <h2>Project View for Project ID #{this.props.match.params.id}</h2>
          <p>{project.title}</p>
          <p>{project.description}</p>
          <div className='project-books'>
            {(this.state.loading)
              ? <p>Loading...</p>
              : project.books.map(book =>
                <BookCard
                  data={book}
                  key={book.id}
                />
              )
            }
          </div>
        </main>
      </div>
    );
  }
}