import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class ProjectDetailNav extends Component {

  state = {
    project: {id: this.props.match.params.project_id},
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.state.project.id}/`)
      .then(response => {
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
    return (
      <div>
        <h4>
          {this.state.loading
            ? "Project Name Loading..."
            : <NavLink to={`/project/${this.state.project.id}`}>
                {this.state.project.title}
              </NavLink>
          }
        </h4>
        <ul>
          <li>
            <NavLink to={`/project/${this.state.project.id}/book/`}>
              Books
            </NavLink>
          </li>
          <li>
            Outlines
          </li>
          <li>
            <NavLink to={`/project/${this.state.project.id}/element/`}>
              Elements
            </NavLink>
            {this.state.project.elements && 
              <ul>
                {this.state.project.elements.map(element => 
                  <NavLink
                    to={`/project/${this.state.project.id}/element/${element.id}`}
                    key={element.id}
                  >
                    <li>{element.name}</li>
                  </NavLink>
                )}
              </ul>
            }
          </li>
        </ul>
      </div>
    );
  }
}