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
      <>
        <div className="nav-item">
          {this.state.loading
            ? <span>"Project Name"</span>
            : <NavLink to={`/project/${project.id}`}>
                <span>{project.title}</span>
              </NavLink>
          }
        </div>
        <div className="nav-item">
          <NavLink to={`/project/${project.id}/book`}>
            <span>Books</span>
          </NavLink>
        </div>
        <div className="nav-item">
          <span>Outlines</span>
        </div>
        <div className="nav-item">
          <NavLink to={`/project/${project.id}/element`}>
            <span>Elements</span>
          </NavLink>
        </div>
        {project.elements && 
          project.elements.map(element => 
            <div className="nav-item">
              <NavLink
                to={`/project/${project.id}/element/${element.id}`}
                key={element.id}
              >
                <span>&gt; {element.name}</span>
              </NavLink>
            </div>
          )
        }
      </>
    );
  }
}