import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class ProjectDetailNav extends Component {

  state = {
    project_id: this.props.match.params.project_id,
    project: {},
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.state.project_id}/`)
      .then(response => {
        console.log(response);
        this.setState({
          project: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching project data', error);
      })
  }

  render() {
    return [
      <h4>{this.state.loading
            ? "Project Name Loading..."
            : this.state.project.title}</h4>,
      <ul>
        <li>
          <NavLink to={`/project/${this.state.project_id}/book`}>
            Books
          </NavLink>
        </li>
        <li>
          Outlines
        </li>
        <li>
          Elements
          {this.state.project.elements && 
            <ul>
              {this.state.project.elements.map(element => 
                <li>{element.name}</li>
              )}
            </ul>
          }
        </li>
      </ul>
    ];
  }
}