import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

export default class AddInstanceModal extends Component {

  state = {
    modalIsOpen: false
  }

  addInstanceFormSubmit = e => {
    e.preventDefault();
    this.closeModal();
    let data = {
      name: this.state.name,
      element_id: this.props.match.params.element_id,
      project_id: this.props.match.params.project_id
    }
    axios.post(`http://127.0.0.1:8000/api/project/${data.project_id}/element/${data.element_id}/instance/`, data)
      .then(response => {
        this.props.addInstance(response.data)
      })
      .catch(error => {
        console.log('Error creating instance', error)
      })
  }

  openModal = () => {
    this.setState({modalIsOpen: true})
  }

  closeModal = () => {
    this.setState({modalIsOpen: false})
  }

  handleNameChange = e => {
    this.setState({name: e.target.value})
  }

  render() {
    return (
      <>
        <button className={this.props.buttonClassName} onClick={this.openModal}>Add {this.props.element.name}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Instance Modal"
        >
          <header>Instance Modal</header>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.addInstanceFormSubmit}>
            <input placeholder="Instance Name" name="name" onChange={this.handleNameChange} />
            <button type="submit">Create Instance</button>
          </form>
        </Modal>
      </>
    )
  }
}