import React, { Component } from 'react'
import Modal from 'react-modal'
import axios from 'axios'

export default class AddElementModal extends Component {

  state = {
    modalIsOpen: false
  }

  addElementFormSubmit = e => {
    e.preventDefault();
    this.closeModal();
    let data = {
      name: this.state.name,
      project_id: this.props.match.params.project_id
    }
    axios.post(`http://127.0.0.1:8000/project/${data.project_id}/element/`, data)
      .then(response => {
        console.log(response.data)
        this.props.addElementToProject(response.data)
        console.log(`/project/${data.project_id}/element/${response.data.id}`)
        this.props.history.push(`/project/${data.project_id}/element/${response.data.id}`)
      })
      .catch(error => {
        console.log('Error creating element', error)
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
        <button className={this.props.buttonClassName} onClick={this.openModal}>Add Element</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Element Modal"
        >
          <header>Element Modal</header>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.addElementFormSubmit}>
            <input placeholder="Element Name" name="name" onChange={this.handleNameChange} />
            <button type="submit">Create Element</button>
          </form>
        </Modal>
      </>
    )
  }
}