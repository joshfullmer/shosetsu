import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import Title from './Title';
import BookCard from './BookCard';

export default class ProjectDetail extends Component {

  state = {
    project: {},
    modalIsOpen: false,
    loading: true
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.props.match.params.project_id}/`)
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

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  addBookFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    let data = {
      title: this.state.title,
      description: this.state.description,
      project_id: this.state.project.id
    }
    axios.post(`http://127.0.0.1:8000/project/${data.project_id}/book/`, data)
      .then(response => {
        console.log(response);
        this.props.history.push(`/book/${response.data.id}`);
      })
      .catch(error => {
        console.log('Book could not be created', error)
      });
  }

  render() {
    let project = this.state.project;
    let project_id = this.props.match.params.project_id;

    return (
      <div className="projectview-body body">
        <Title title={`Project ID #${project_id}`} />
        <main className="projectview-container">
          <h2>Project View for Project ID #{project_id}</h2>
          <button onClick={this.openModal}>Add Book</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Book Modal"
          >
            <h2>Book Modal</h2>
            <button onClick={this.closeModal}>close</button>
            <form onSubmit={this.addBookFormSubmit}>
              <input placeholder="Book Title" name="title" onChange={this.handleTitleChange} />
              <input placeholder="Book Description" name="description" onChange={this.handleDescriptionChange} />
              <button type="submit">Create Book</button>
            </form>
          </Modal>
          <p>{project.title}</p>
          <p>{project.description}</p>
          <div className='project-books'>
            {(this.state.loading)
              ? <p>Loading...</p>
              : project.books.map(book =>
                <BookCard
                  data={book}
                  key={book.id}
                  project_id={project.id}
                />
              )
            }
          </div>
        </main>
      </div>
    );
  }
}