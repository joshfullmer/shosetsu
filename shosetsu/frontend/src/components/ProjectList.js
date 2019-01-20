import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import ProjectCard from './ProjectCard';
import Title from './Title';
import ProjectListToolbar from './ProjectListToolbar';

Modal.setAppElement('#root')

export default class ProjectList extends Component {

  state = {
    projects: [],
    loading: true
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/project/')
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

  render() {
    return (
      <div className="projectlist-body body">
        <Title title="Project List" />
        <main className="projectlist-container">
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
        <ProjectListToolbar
          {...this.props}
        />
      </div>
    );
  }
}