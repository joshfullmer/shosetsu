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

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Logo />

          {/* Nav */}
          <nav>
            <Route path='/' component={ProjectListNav} />
            <Route path='/project/:project_id(\d+)/' component={ProjectDetailNav} />
          </nav>
          

          {/* Page Body */}
          <Switch>
            <Route exact path='/' component={ProjectList} />
            <Route exact path='/project' component={ProjectList} />
            <Route exact path='/project/:project_id(\d+)' component={ProjectDetail} />
            <Route exact path='/project/:project_id(\d+)/book' component={BookList} />
            <Route exact path='/project/:project_id(\d+)/book/:book_id(\d+)' component={BookDetail} />
            <Route exact path='/project/:project_id(\d+)/book/:book_id(\d+)/chapter/:chapter_id(\d+)' component={ChapterDetail} />
            <Route exact path='/project/:project_id(\d+)/element' component={ElementList} />
            <Route exact path='/project/:project_id(\d+)/element/:element_id(\d+)' component={props => <ElementDetail key={props.match.params.element_id} {...props} />} />
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
