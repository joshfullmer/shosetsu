import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import BookCard from './BookCard';
import ElementCard from './ElementCard';
import ProjectDetailToolbar from './ProjectDetailToolbar';
import ProjectDetailSidebar from './ProjectDetailSidebar';
import ProjectDetailBreadcrumbs from './breadcrumbs/ProjectDetailBreadcrumbs';

export default class ProjectDetail extends Component {
  static propTypes = {
    project: PropTypes.shape.isRequired,
    match: PropTypes.shape.isRequired,
    history: PropTypes.shape.isRequired,
    renameProject: PropTypes.func.isRequired
  };

  rename = (title) => {
    const { match, renameProject } = this.props;
    const data = {
      id: match.params.project_id,
      title
    };
    axios
      .patch(`http://127.0.0.1:8000/api/project/${match.params.project_id}/`, data)
      .then(() => {
        renameProject(data.title);
      })
      .catch((error) => {
        console.log('Error renaming project', error);
      });
  };

  delete = () => {
    const { match, history } = this.props;
    axios
      .delete(`http://127.0.0.1:8000/api/project/${match.params.project_id}/`)
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
      <div className="projectview-body body">
        <ProjectDetailBreadcrumbs project={project} rename={this.rename} loading={loading} />
        <ProjectDetailToolbar {...this.props} delete={this.delete} />
        <main className="projectview-container">
          <NavLink to={`/project/${project.id}/book`}>
            <header>Books</header>
          </NavLink>
          <div className="project-books">
            {loading ? (
              <p>Loading...</p>
            ) : (
              project.books.map(book => <BookCard data={book} key={book.id} project={project} />)
            )}
          </div>
          <NavLink to={`/project/${project.id}/element`}>
            <header>Elements</header>
          </NavLink>
          <div className="project-elements">
            {loading ? (
              <p>Loading...</p>
            ) : (
              project.elements.map(element => (
                <ElementCard project={project} element={element} key={element.id} />
              ))
            )}
          </div>
        </main>
        <ProjectDetailSidebar project={project} />
      </div>
    );
  }
}
