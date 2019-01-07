import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logo from './components/Logo';
import Nav from './components/Nav';
import ProjectList from './components/ProjectList';
import ProjectView from './components/ProjectView';
import BookList from './components/BookList';
import BookView from './components/BookView';
import ChapterView from './components/ChapterView';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Logo />
          <Nav />

          {/* Page Body */}
          <Switch>
            <Route exact path='/' component={ProjectList} />
            <Route exact path='/projects' component={ProjectList} />
            <Route exact path='/projects/:id(\d+)' component={ProjectView} />
            <Route exact path='/books' component={BookList} />
            <Route exact path='/books/:id(\d+)' component={BookView} />
            <Route exact path='/chapters/:id(\d+)' component={ChapterView} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
