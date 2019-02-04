import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BookCard from './BookCard';
import ElementCard from './ElementCard';
import ProjectDetailToolbar from './ProjectDetailToolbar';
import ProjectDetailSidebar from './ProjectDetailSidebar';
import ProjectDetailBreadcrumbs from './breadcrumbs/ProjectDetailBreadcrumbs';
import Body from './styled/Body';
import Main from './styled/Main';

axios.defaults.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

const ProjectDetailBody = styled(Body)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: inherit;
  grid-template-areas:
    'title'
    'main'
    'sidebar'
    'toolbar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: inherit;
    grid-template-areas:
      'title toolbar'
      'main sidebar'
      'main sidebar';
  }
`;

const ProjectDetailContainer = styled(Main)``;

const ProjectBooks = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-auto-rows: minmax(250px, auto);
  }
`;

const ProjectElements = styled.div`
  display: grid;
  grid-gap: 10px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, auto));
    grid-auto-rows: minmax(250px, auto);
  }
`;

export default class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    renameProject: PropTypes.func.isRequired
  };

  rename = (title) => {
    const { match, renameProject } = this.props;
    const data = {
      id: match.params.project_id,
      title
    };
    axios
      .patch(`/api/project/${match.params.project_id}/`, data)
      .then(() => {
        renameProject(data.title);
      })
      .catch((error) => {
        console.log('Error renaming project', error);
      });
  };

  deleteProject = () => {
    const { match, history } = this.props;
    axios
      .delete(`/api/project/${match.params.project_id}/`)
      .then(() => {
        history.push('/project');
      })
      .catch((error) => {
        console.log('Error deleting project', error);
      });
  };

  render() {
    const { project } = this.props;
    const loading = Object.keys(project).length === 0;

    return (
      <ProjectDetailBody>
        <ProjectDetailBreadcrumbs project={project} rename={this.rename} loading={loading} />
        <ProjectDetailToolbar
          {...this.props}
          project={project}
          deleteProject={this.deleteProject}
        />
        <ProjectDetailContainer>
          <NavLink to={`/project/${project.id}/book`}>
            <header>Books</header>
          </NavLink>
          <ProjectBooks>
            {loading ? (
              <p>Loading...</p>
            ) : (
              project.books.map(book => <BookCard book={book} key={book.id} project={project} />)
            )}
          </ProjectBooks>
          <NavLink to={`/project/${project.id}/element`}>
            <header>Elements</header>
          </NavLink>
          <ProjectElements>
            {loading ? (
              <p>Loading...</p>
            ) : (
              project.elements.map(element => (
                <ElementCard project={project} element={element} key={element.id} />
              ))
            )}
          </ProjectElements>
        </ProjectDetailContainer>
        <ProjectDetailSidebar project={project} />
      </ProjectDetailBody>
    );
  }
}
