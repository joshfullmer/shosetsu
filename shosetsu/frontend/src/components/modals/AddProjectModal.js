import React, { Component } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

export default class AddProjectModal extends Component {

  state = {
    modalIsOpen: false
  }

  addProjectFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    let data = {
      title: this.state.title,
      description: this.state.description
    }
    axios.post('http://127.0.0.1:8000/api/project/', data)
      .then(response => {
        this.props.history.push(`/project/${response.data.id}`);
      })
      .catch(error => {
        console.log('Project could not be created', error)
      });
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <>
        <button className={this.props.buttonClassName} onClick={this.openModal}>Add Project</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          contentLabel="Add Project Modal"
        >
          <h2>Project Modal</h2>
          <button onClick={this.closeModal}>close</button>
          <form onSubmit={this.addProjectFormSubmit}>
            <input placeholder="Project Title" name="title" onChange={this.handleTitleChange} />
            <input placeholder="Project Description" name="description" onChange={this.handleDescriptionChange} />
            <button type="submit">Create Project</button>
          </form>
        </Modal>
      </>
    )
  }
}