import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Logo from './components/nav/Logo';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import ChapterDetail from './components/ChapterDetail';
import Footer from './components/nav/Footer';
import ProjectListNav from './components/nav/ProjectListNav';
import ProjectDetailNav from './components/nav/ProjectDetailNav';
import ElementList from './components/ElementList'
import ElementDetail from './components/ElementDetail';
import NotFound from './components/NotFound';
import InstanceDetail from './components/InstanceDetail';

class App extends Component {

  state = {
    project: {}
  }

  // Handle element list in Nav

  setProject = project => {
    this.setState({project: project})
  }

  addElementToProject = element => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        elements: [
          ...prevState.project.elements, element
        ]
      }
    }))
  }

  removeElementFromProject = element => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        elements: prevState.project.elements.filter(obj => (
          obj.id !== element.id
        ))
      }
    }))
  }

  // Handle books in state

  addBookToProject = book => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        books: [
          ...prevState.project.books, book
        ]
      }
    }))
  }

  removeBookFromProject = book => {
    this.setState(prevState => ({
      project: {
        ...prevState.project,
        books: prevState.project.books.filter(obj => (
          obj.id !== book.id
        ))
      }
    }))
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Logo />

          {/* Nav */}
          <nav>
            <Route path='/' component={ProjectListNav} />
            <Route path='/project/:project_id(\d+)/' render={props => <ProjectDetailNav {...props} project={this.state.project} setProject={this.setProject}/>} />
          </nav>
          

          {/* Page Body */}
          <Switch>
            <Route exact path='/' component={ProjectList} />
            <Route exact path='/project' component={ProjectList} />
            <Route exact path='/project/:project_id(\d+)' render={props => <ProjectDetail {...props} project={this.state.project} addElementToProject={this.addElementToProject} addBookToProject={this.addBookToProject} />} />
            <Route exact path='/project/:project_id(\d+)/book' render={props => <BookList {...props} addBookToProject={this.addBookToProject} />} />
            <Route exact path='/project/:project_id(\d+)/book/:book_id(\d+)' render={props => <BookDetail {...props} removeBookFromProject={this.removeBookFromProject} />} />
            <Route exact path='/project/:project_id(\d+)/book/:book_id(\d+)/chapter/:chapter_id(\d+)' component={ChapterDetail} />
            <Route exact path='/project/:project_id(\d+)/element' render={props => <ElementList {...props} addElementToProject={this.addElementToProject} />} />
            <Route exact path='/project/:project_id(\d+)/element/:element_id(\d+)' render={props => <ElementDetail {...props} key={props.match.params.element_id} removeElementFromProject={this.removeElementFromProject} />} />
            <Route exact path='/project/:project_id(\d+)/element/:element_id(\d+)/instance/:instance_id(\d+)' component={InstanceDetail} />
            <Route exact path='/404' component={NotFound} />
            <Redirect from='*' to='/404' />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
