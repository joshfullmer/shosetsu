import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class AddChapterModal extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    modalIsOpen: false,
    title: ''
  };

  addChapterFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    const { title } = this.state;
    const { history, project, book } = this.props;
    const data = {
      title,
      book_id: book.id
    };
    axios
      .post(`http://127.0.0.1:8000/api/project/${project.id}/book/${book.id}/chapter/`, data)
      .then((response) => {
        history.push(`/project/${project.id}/book/${book.id}/chapter/${response.data.id}/`);
      })
      .catch((error) => {
        console.log('Chapter could not be created', error);
      });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <>
        <button type="button" onClick={this.openModal}>
          Add Chapter
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Chapter Modal"
        >
          <header>Chapter Modal</header>
          <button type="button" onClick={this.closeModal}>
            close
          </button>
          <form onSubmit={this.addChapterFormSubmit}>
            <input placeholder="Chapter Title" name="title" onChange={this.handleTitleChange} />
            <button type="submit">Create Chapter</button>
          </form>
        </Modal>
      </>
    );
  }
}
