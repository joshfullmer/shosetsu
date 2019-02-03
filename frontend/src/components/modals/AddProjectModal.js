import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

export default class AddProjectModal extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    modalIsOpen: false,
    title: '',
    description: ''
  };

  addProjectFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    const { title, description } = this.state;
    const { history } = this.props;
    const data = {
      title,
      description
    };
    axios
      .post('/api/project/', data)
      .then((response) => {
        history.push(`/project/${response.data.id}`);
      })
      .catch((error) => {
        console.log('Project could not be created', error);
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
          Add Project
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Project Modal"
        >
          <h2>Project Modal</h2>
          <button type="button" onClick={this.closeModal}>
            close
          </button>
          <form onSubmit={this.addProjectFormSubmit}>
            <input placeholder="Project Title" name="title" onChange={this.handleTitleChange} />
            <input
              placeholder="Project Description"
              name="description"
              onChange={this.handleDescriptionChange}
            />
            <button type="submit">Create Project</button>
          </form>
        </Modal>
      </>
    );
  }
}
