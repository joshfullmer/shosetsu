import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

export default class AddBookModal extends Component {

  state = {
    modalIsOpen: false,
    project_id: this.props.match.params.project_id
  }

  addBookFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    let data = {
      title: this.state.title,
      description: this.state.description,
      project_id: this.state.project_id
    }
    axios.post(`http://127.0.0.1:8000/project/${data.project_id}/book/`, data)
      .then(response => {
        this.props.addBookToProject(response.data)
        this.props.history.push(`/project/${data.project_id}/book/${response.data.id}`);
      })
      .catch(error => {
        console.log('Book could not be created', error)
      });
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  render() {
    return (
      <>
        <button className={this.props.buttonClassName} onClick={this.openModal}>Add Book</button>
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
      </>
    );
  }
}