import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class AddInstanceModal extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    addInstance: PropTypes.func.isRequired
  };

  state = {
    modalIsOpen: false,
    name: ''
  };

  addInstanceFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    const { project, element, addInstance } = this.props;
    const { name } = this.state;
    const data = {
      name,
      element_id: element.id,
      project_id: project.id
    };
    axios
      .post(`https://shosetsu.appspot.com/api/project/${project.id}/element/${element.id}/instance/`, data)
      .then((response) => {
        addInstance(response.data);
      })
      .catch((error) => {
        console.log('Error creating instance', error);
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
    const { element } = this.props;
    return (
      <>
        <button type="button" onClick={this.openModal}>
          Add
          {' '}
          {element.name}
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Instance Modal"
        >
          <header>Instance Modal</header>
          <button type="button" onClick={this.closeModal}>
            close
          </button>
          <form onSubmit={this.addInstanceFormSubmit}>
            <input placeholder="Instance Name" name="name" onChange={this.handleNameChange} />
            <button type="submit">Create Instance</button>
          </form>
        </Modal>
      </>
    );
  }
}
