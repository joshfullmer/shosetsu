import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios'

import Title from './Title';
import BookCard from './BookCard';
import ElementCard from './ElementCard';
import ProjectDetailToolbar from './ProjectDetailToolbar';
import ProjectDetailSidebar from './ProjectDetailSidebar';

export default class ProjectDetail extends Component {

  delete = () => {
    axios.delete(`http://127.0.0.1:8000/project/${this.props.match.params.project_id}/`)
      .then(() => {
        this.props.history.push(`/project`);
      })
      .catch(error => {
        console.log('Error deleting project', error)
      });
  }

  render() {
    let project = this.props.project;
    let loading = Object.keys(project).length === 0;

    return (
      <div className="projectview-body body">
        <Title title={project.title} />
        <ProjectDetailToolbar {...this.props} delete={this.delete} />
        <main className="projectview-container">
          <NavLink to={`/project/${project.id}/book`}>
            <header>Books</header>
          </NavLink>
          <div className="project-books">
            {(loading)
              ? <p>Loading...</p>
              : project.books.map(book =>
                  <BookCard
                    data={book}
                    key={book.id}
                    project={project}
                  />
                )
            }
          </div>
          <NavLink to={`/project/${project.id}/element`}>
            <header>Elements</header>
          </NavLink>
          <div className="project-elements">
            {(loading)
              ? <p>Loading...</p>
              : project.elements.map(element => 
                  <ElementCard
                    project={project}
                    element={element}
                    key={element.id}
                  />
                )
            }
          </div>
        </main>
        <ProjectDetailSidebar project={project}/>
      </div>
    );
  }
}