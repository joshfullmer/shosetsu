import React, { Component } from 'react';
import axios from 'axios';

import Project from './Project';

export default class ProjectList extends Component {

  state = {
    projects: [],
    loading: true,
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

  render() {
    return (
      <main className="projects-container">
        <h2>Projects</h2>
        <div className="projects">
          {(this.state.loading)
            ? <p>Loading...</p>
            : this.state.projects.map(project =>
              <Project
                data={project}
                key={project.id}
              />
            )
          }
        </div>
      </main>
    );
  }
}