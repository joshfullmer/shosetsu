import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

axios.defaults.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

export default class AddBookModal extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    addBookToProject: PropTypes.func.isRequired
  };

  state = {
    modalIsOpen: false,
    // eslint-disable-next-line react/destructuring-assignment
    title: '',
    description: ''
  };

  addBookFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    const { title, description } = this.state;
    const { project, addBookToProject, history } = this.props;
    const data = {
      project_id: project.id,
      title,
      description
    };
    axios
      .post(`/api/project/${project.id}/book/`, data)
      .then((response) => {
        addBookToProject(response.data);
        history.push(`/project/${project.id}/book/${response.data.id}`);
      })
      .catch((error) => {
        console.log('Book could not be created', error);
      });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <>
        <button type="button" onClick={this.openModal}>
          Add Book
        </button>
        <Modal isOpen={modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Book Modal">
          <h2>Book Modal</h2>
          <button type="button" onClick={this.closeModal}>
            close
          </button>
          <form onSubmit={this.addBookFormSubmit}>
            <input placeholder="Book Title" name="title" onChange={this.handleTitleChange} />
            <input
              placeholder="Book Description"
              name="description"
              onChange={this.handleDescriptionChange}
            />
            <button type="submit">Create Book</button>
          </form>
        </Modal>
      </>
    );
  }
}
