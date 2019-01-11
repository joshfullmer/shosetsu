import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logo from './components/Logo';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import ChapterDetail from './components/ChapterDetail';
import Footer from './components/Footer';
import ProjectListNav from './components/ProjectListNav';
import ProjectDetailNav from './components/ProjectDetailNav';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Logo />

          {/* Nav */}
          <nav>
            <Route exact path='/' component={ProjectListNav} />
            <Route path='/project' component={ProjectListNav} />
            <Route path='/project/:project_id(\d+)' component={ProjectDetailNav} />
          </nav>
          

          {/* Page Body */}
          <Switch>
            <Route exact path='/' component={ProjectList} />
            <Route exact path='/project' component={ProjectList} />
            <Route exact path='/project/:project_id(\d+)' component={ProjectDetail} />
            <Route exact path='/project/:project_id(\d+)/book' component={BookList} />
            <Route exact path='/project/:project_id(\d+)/book/:book_id(\d+)' component={BookDetail} />
            <Route exact path='/project/:project_id(\d+)/book/:book_id(\d+)/chapter/:chapter_id(\d+)' component={ChapterDetail} />
          </Switch>

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
