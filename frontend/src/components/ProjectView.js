import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title';

export default class ProjectView extends Component {

  state = {
    project: {},
    loading: true
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/projects/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          project: response.data
        });
      })
      .catch(error => {
        console.log('Error fetching project data', error);
      });
  }

  render() {
    return (
      <div className="projectview-body body">
        <Title title={`Project ID #${this.props.match.params.id}`} />
        <main className="projectview-container">
          <h2>Project View for Project ID #{this.props.match.params.id}</h2>
          <p>{this.state.project.title}</p>
          <p>{this.state.project.description}</p>
        </main>
      </div>
    );
  }
}