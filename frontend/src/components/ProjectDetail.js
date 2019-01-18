import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import Title from './Title';
import BookCard from './BookCard';
import ElementCard from './ElementCard';
import AddBookModal from './modals/AddBookModal';
import AddElementModal from './modals/AddElementModal';

export default class ProjectDetail extends Component {
  render() {
    let project = this.props.project;
    let loading = Object.keys(project).length === 0;

    return (
      <div className="projectview-body body">
        <Title title={project.title} />
        <main className="projectview-container">
          <AddBookModal
            buttonClassName=""
            {...this.props}
          />
          <AddElementModal
            buttonClassName=""
            {...this.props}
          />
          <p>{project.description}</p>
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
      </div>
    );
  }
}