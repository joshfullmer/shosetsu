import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

export default class AddFieldModal extends Component {

  state = {
    modalIsOpen: false
  }

  addFieldFormSubmit = e => {
    e.preventDefault();
    this.closeModal();
    let data = {
      element_id: this.props.match.params.element_id,
      label: this.state.label,
      type: this.state.type,
      details: ""
    }
    axios.post(`http://127.0.0.1:8000/project/${this.props.match.params.project_id}/element/${data.element_id}/field/`, data)
      .then(response => {
        this.props.addField(response.data)
      })
      .catch(error => {
        console.log('Error creating field', error)
      })
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  handleLabelChange = e => {
    this.setState({label: e.target.value})
  }

  handleTypeChange = e => {
    this.setState({type: e.target.value})
  }

  render() {
    return (
      <div>
        <button className={this.props.buttonClassName} onClick={this.openModal}>Add Field</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Field Modal"
        >
          <header>Field Modal</header>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.addFieldFormSubmit}>
            <input placeholder="Field Label" name="label" onChange={this.handleLabelChange} />
            <select onChange={this.handleTypeChange}>
              <option disabled selected value> --- </option>
              <option value="text">Text</option>
            </select>
            <button type="submit">Create Field</button>
          </form>
        </Modal>
      </div>
    )
  }
}