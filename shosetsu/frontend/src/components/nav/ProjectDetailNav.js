import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import NavItem from '../styled/NavItem';

export default class ProjectDetailNav extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setProject: PropTypes.func.isRequired
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    project: { id: this.props.match.params.project_id },
    loading: true
  };

  componentDidMount() {
    const { project } = this.state;
    const { setProject, history } = this.props;
    axios
      .get(`http://127.0.0.1:8000/api/project/${project.id}/`)
      .then((response) => {
        setProject(response.data);
        this.setState({
          project: response.data,
          loading: false
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error fetching project data', error);
      });
  }

  render() {
    const { project, loading } = this.state;
    return (
      <>
        <NavItem key={`project-${project.id}`}>
          {loading ? (
            <span>Project Name</span>
          ) : (
            <NavLink to={`/project/${project.id}`}>
              <span>{project.title}</span>
            </NavLink>
          )}
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
        {project.elements
          && project.elements.map(element => (
            <NavItem key={`element-${element.id}`}>
              <NavLink to={`/project/${project.id}/element/${element.id}`}>
                <span>
                  &gt;
                  {element.name}
                </span>
              </NavLink>
            </NavItem>
          ))}
      </>
    );
  }
}
