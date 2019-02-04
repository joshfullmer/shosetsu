import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import NavItem from '../styled/NavItem';

axios.defaults.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

export default class ProjectDetailNav extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
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
      .get(`/api/project/${project.id}/`)
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

  componentWillReceiveProps(nextProps) {
    this.setState({ project: nextProps.project });
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
