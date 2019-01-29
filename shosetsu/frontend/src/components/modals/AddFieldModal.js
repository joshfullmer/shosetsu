import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class AddFieldModal extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    element: PropTypes.object.isRequired,
    addField: PropTypes.func.isRequired
  };

  state = {
    modalIsOpen: false,
    label: '',
    type: ''
  };

  addFieldFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    const { label, type } = this.state;
    const { element, project, addField } = this.props;
    const data = {
      element_id: element.id,
      label,
      type,
      details: ''
    };
    axios
      .post(`http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/field/`, data)
      .then((response) => {
        addField(response.data);
      })
      .catch((error) => {
        console.log('Error creating field', error);
      });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value });
  };

  render() {
    const { modalIsOpen } = this.state;
    return (
      <>
        <button type="button" onClick={this.openModal}>
          Add Field
        </button>
        <Modal isOpen={modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Field Modal">
          <header>Field Modal</header>
          <button type="button" onClick={this.closeModal}>
            close
          </button>
          <form onSubmit={this.addFieldFormSubmit}>
            <input placeholder="Field Label" name="label" onChange={this.handleLabelChange} />
            <select onChange={this.handleTypeChange}>
              <option disabled selected value>
                {' '}
                ---
                {' '}
              </option>
              <option value="text">Text</option>
            </select>
            <button type="submit">Create Field</button>
          </form>
        </Modal>
      </>
    );
  }
}
