import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logo from './components/Logo';
import Title from './components/Title';
import Nav from './components/Nav';
import ProjectList from './components/ProjectList';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Toolbar from './components/Toolbar';
import BookList from './components/BookList'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Logo />
          <Title />
          <Nav />
          <Switch>
            <Route exact path='/' component={ProjectList} />
            <Route path='/books' component={BookList} />
          </Switch>
          <Sidebar />
          <Footer />
          <Toolbar />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;