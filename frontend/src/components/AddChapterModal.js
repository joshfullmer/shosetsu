import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

export default class AddChapterModal extends Component {

  state = {
    modalIsOpen: false
  }

  addChapterFormSubmit = e => {
    e.preventDefault();
    this.closeModal();
    let data = {
      title: this.state.title,
      book_id: this.props.match.params.book_id
    }
    axios.post(`http://127.0.0.1:8000/project/${this.props.match.params.project_id}/book/${data.book_id}/chapter/`, data)
      .then(response => {
        this.props.history.push(`/project/${this.props.match.params.project_id}/book/${data.book_id}/chapter/${response.data.id}/`)
      })
      .catch(error => {
        console.log('Chapter could not be created', error)
      })
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  handleTitleChange = e => {
    this.setState({title: e.target.value})
  }

  render() {
    return (
      <div>
        <button className={this.props.buttonClassName} onClick={this.openModal}>Add Chapter</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Chapter Modal"
        >
          <header>Chapter Modal</header>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.addChapterFormSubmit}>
            <input placeholder="Chapter Title" name="title" onChange={this.handleTitleChange} />
            <button type="submit">Create Chapter</button>
          </form>
        </Modal>
      </div>
    );
  }
}