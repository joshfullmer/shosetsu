import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PropTypes from 'prop-types';

axios.defaults.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

export default class AddElementModal extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    addElementToProject: PropTypes.func.isRequired
  };

  state = {
    modalIsOpen: false
  };

  addElementFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    const { project, addElementToProject, history } = this.props;
    const { name } = this.state;
    const data = {
      name,
      project_id: project.id
    };
    axios
      .post(`/api/project/${data.project_id}/element/`, data)
      .then((response) => {
        addElementToProject(response.data);
        history.push(`/project/${data.project_id}/element/${response.data.id}`);
      })
      .catch((error) => {
        console.log('Error creating element', error);
      });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <>
        <button type="button" onClick={this.openModal}>
          Add Element
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Element Modal"
        >
          <header>Element Modal</header>
          <button type="button" onClick={this.closeModal}>
            close
          </button>
          <form onSubmit={this.addElementFormSubmit}>
            <input placeholder="Element Name" name="name" onChange={this.handleNameChange} />
            <button type="submit">Create Element</button>
          </form>
        </Modal>
      </>
    );
  }
}
