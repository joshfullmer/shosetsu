import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Title from './Title';
import BookCard from './BookCard';
import ElementCard from './ElementCard';
import AddBookModal from './AddBookModal';
import AddElementModal from './AddElementModal';

export default class ProjectDetail extends Component {

  state = {
    project: {id: this.props.match.params.project_id},
    addBookModalIsOpen: false,
    loading: true
  };

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.props.match.params.project_id}/`)
      .then(response => {
        this.setState({
          project: response.data,
          loading: false
        });
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching project data', error);
      });
  }

  render() {
    let project = this.state.project;
    let title = this.state.loading ? "Loading..." : this.state.project.title;

    return (
      <div className="projectview-body body">
        <Title title={title} />
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
            {(this.state.loading)
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
            {(this.state.loading)
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