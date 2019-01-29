import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import NavItem from './NavItem';

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
        <NavItem key={`project-${project.id}`}>
          {this.state.loading
            ? <span>"Project Name"</span>
            : <NavLink to={`/project/${project.id}`}>
                <span>{project.title}</span>
              </NavLink>
          }
        </NavItem>
        <NavItem key="book">
          <NavLink to={`/project/${project.id}/book`}>
            <span>Books</span>
          </NavLink>
        </NavItem>
        <NavItem key="outline">
          <span>Outlines</span>
        </NavItem>
        <NavItem key="element">
          <NavLink to={`/project/${project.id}/element`}>
            <span>Elements</span>
          </NavLink>
        </NavItem>
        {project.elements && 
          project.elements.map(element => 
            <NavItem key={`element-${element.id}`}>
              <NavLink
                to={`/project/${project.id}/element/${element.id}`}
              >
                <span>&gt; {element.name}</span>
              </NavLink>
            </NavItem>
          )
        }
      </>
    );
  }
}