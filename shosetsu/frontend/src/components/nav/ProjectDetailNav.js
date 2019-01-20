import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class ProjectDetailNav extends Component {

  state = {
    project_id: this.props.match.params.project_id,
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/project/${this.state.project_id}/`)
      .then(response => {
        this.props.setProject(response.data)
        this.setState({
          loading: false
        });
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching project data', error);
      })
  }

  render() {
    let project = this.props.project
    return (
      <div>
        <h4>
          {this.state.loading
            ? "Project Name Loading..."
            : <NavLink to={`/project/${project.id}`}>
                {project.title}
              </NavLink>
          }
        </h4>
        <ul>
          <li>
            <NavLink to={`/project/${project.id}/book`}>
              Books
            </NavLink>
          </li>
          <li>
            Outlines
          </li>
          <li>
            <NavLink to={`/project/${project.id}/element`}>
              Elements
            </NavLink>
            {project.elements && 
              <ul>
                {project.elements.map(element => 
                  <NavLink
                    to={`/project/${project.id}/element/${element.id}`}
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