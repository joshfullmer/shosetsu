import React, { Component } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

import ProjectCard from './ProjectCard';
import ProjectListToolbar from './ProjectListToolbar';
import ProjectListBreadcrumbs from './breadcrumbs/ProjectListBreadcrumbs';
import Body from './styled/Body';
import Main from './styled/Main';

axios.defaults.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

Modal.setAppElement('#root');

const ProjectListBody = styled(Body)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: inherit;
  grid-template-areas:
    'title'
    'main'
    'toolbar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: inherit;
    grid-template-areas:
      'title toolbar'
      'main main'
      'main main';
  }
`;

const ProjectListContainer = styled(Main)`
  overflow: auto;
`;

const Projects = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-auto-rows: minmax(250px, auto);
  }
`;

export default class ProjectList extends Component {
  state = {
    projects: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('/api/project/')
      .then((response) => {
        this.setState({
          projects: response.data,
          loading: false
        });
      })
      .catch((error) => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    const { projects, loading } = this.state;
    return (
      <ProjectListBody>
        <ProjectListBreadcrumbs />
        <ProjectListContainer>
          <Projects>
            {loading ? (
              <p>Loading...</p>
            ) : (
              projects.map(project => <ProjectCard project={project} key={project.id} />)
            )}
          </Projects>
        </ProjectListContainer>
        <ProjectListToolbar {...this.props} />
      </ProjectListBody>
    );
  }
}
