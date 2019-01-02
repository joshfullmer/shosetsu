import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import ProjectCard from './ProjectCard';
import Title from './Title';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

Modal.setAppElement('#root')

export default class ProjectList extends Component {

  state = {
    projects: [],
    loading: true,
    modalIsOpen: false
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/projects/')
      .then(response => {
        this.setState({
          projects: response.data,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error)
      });
  }

  openModal = () => {
    this.setState({modalIsOpen: true});
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handleDescriptionChange = (e) => {
    this.setState({description: e.target.value});
  }

  addProjectFormSubmit = (e) => {
    e.preventDefault();
    this.closeModal();
    let data = {
      title: this.state.title,
      description: this.state.description
    }
    axios.post('http://127.0.0.1:8000/projects/', data)
      .then(response => {
        this.props.history.push(`/projects/${response.data.id}`);
      })
      .catch(error => {
        console.log('Project could not be created', error)
      });
    this.props.history.push('/books');
  }

  render() {
    return (
      <div className="projectlist-body body">
        <Title title="Project List" />
        <main className="projectlist-container">
          <h2>Projects</h2>
          <button onClick={this.openModal}>Add Project</button>
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
          <div className="projectlist">
            {(this.state.loading)
              ? <p>Loading...</p>
              : this.state.projects.map(project =>
                <ProjectCard
                  data={project}
                  key={project.id}
                />
              )
            }
          </div>
        </main>
        <Sidebar />
        <Toolbar />
      </div>
    );
  }
}