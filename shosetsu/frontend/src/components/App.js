import React, { Component } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect
} from 'react-router-dom';
import styled from 'styled-components';

import Logo from './nav/Logo';
import ProjectList from './ProjectList';
import ProjectDetail from './ProjectDetail';
import BookList from './BookList';
import BookDetail from './BookDetail';
import ChapterDetail from './ChapterDetail';
import Footer from './nav/Footer';
import ProjectListNav from './nav/ProjectListNav';
import ProjectDetailNav from './nav/ProjectDetailNav';
import ElementList from './ElementList';
import ElementDetail from './ElementDetail';
import NotFound from './NotFound';
import InstanceDetail from './InstanceDetail';
import GlobalStyle from './styled/GlobalStyle';

const AppContainer = styled.div`
  > * {
    color: #fff;
    text-shadow: 0 2px 0 rgba(110, 133, 156, 0.12);
  }
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas:
    'logo'
    'body'
    'footer';

  @media (min-width: 768px) {
    height: 100vh;
    grid-template-columns: 1fr 6fr;
    grid-template-rows: 75px minmax(150px, auto) 100px;
    grid-template-areas:
      'logo body'
      'nav body'
      'footer body';
  }

  @media (min-width: 992px) {
    grid-template-areas:
      'logo body'
      'nav body'
      'footer body';
  }
`;

const Nav = styled.nav`
  background-color: #fbaea8;
  grid-area: nav;
  padding: 0.85em;

  @media (max-width: 767px) {
    display: none;
  }
`;

class App extends Component {
  state = {
    project: {}
  };

  // Handle element list in Nav

  setProject = (project) => {
    this.setState({ project });
  };

  renameProject = (title) => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        title
      }
    }));
  };

  addElementToProject = (element) => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        elements: [...prevState.project.elements, element]
      }
    }));
  };

  removeElementFromProject = (element) => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        elements: prevState.project.elements.filter(obj => obj.id !== element.id)
      }
    }));
  };

  // Handle books in state

  addBookToProject = (book) => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        books: [...prevState.project.books, book]
      }
    }));
  };

  removeBookFromProject = (book) => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        books: prevState.project.books.filter(obj => obj.id !== book.id)
      }
    }));
  };

  updateElementName = (element) => {
    const { project } = this.state;
    const elementIndex = project.elements.findIndex(e => e.id === element.id);
    const updatedElements = [...project.elements];
    updatedElements[elementIndex] = element;
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        elements: updatedElements
      }
    }));
  };

  render() {
    const { project } = this.state;
    return (
      <BrowserRouter>
        <AppContainer>
          <GlobalStyle />
          <Logo />

          {/* Nav */}
          <Nav>
            <Route path="/" component={ProjectListNav} />
            <Route
              path="/project/:project_id(\d+)/"
              render={props => (
                <ProjectDetailNav {...props} project={project} setProject={this.setProject} />
              )}
            />
          </Nav>

          {/* Page Body */}
          <Switch>
            <Route exact path="/" component={ProjectList} />
            <Route exact path="/project" component={ProjectList} />
            <Route
              exact
              path="/project/:project_id(\d+)"
              render={props => (
                <ProjectDetail
                  {...props}
                  project={project}
                  addElementToProject={this.addElementToProject}
                  addBookToProject={this.addBookToProject}
                  renameProject={this.renameProject}
                />
              )}
            />
            <Route
              exact
              path="/project/:project_id(\d+)/book"
              render={props => <BookList {...props} addBookToProject={this.addBookToProject} />}
            />
            <Route
              exact
              path="/project/:project_id(\d+)/book/:book_id(\d+)"
              render={props => (
                <BookDetail {...props} removeBookFromProject={this.removeBookFromProject} />
              )}
            />
            <Route
              exact
              path="/project/:project_id(\d+)/book/:book_id(\d+)/chapter/:chapter_id(\d+)"
              component={ChapterDetail}
            />
            <Route
              exact
              path="/project/:project_id(\d+)/element"
              render={props => (
                <ElementList {...props} addElementToProject={this.addElementToProject} />
              )}
            />
            <Route
              exact
              path="/project/:project_id(\d+)/element/:element_id(\d+)"
              render={props => (
                <ElementDetail
                  {...props}
                  key={props.match.params.element_id}
                  removeElementFromProject={this.removeElementFromProject}
                  updateElementName={this.updateElementName}
                />
              )}
            />
            <Route
              exact
              path="/project/:project_id(\d+)/element/:element_id(\d+)/instance/:instance_id(\d+)"
              component={InstanceDetail}
            />
            <Route exact path="/404" component={NotFound} />
            <Redirect from="*" to="/404" />
          </Switch>

          <Footer />
        </AppContainer>
      </BrowserRouter>
    );
  }
}

export default App;
