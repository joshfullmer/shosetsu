import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default class Nav extends Component {

  state = {
    elements: [],
    loading: true
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/elements/')
      .then(response => {
        this.setState({
          elements: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error loading element types data', error);
      });
  }

  render() {
    let elements = this.state.elements;

    return (
      <nav>
        Navigation
        <ul className="nav-list">
          <li><NavLink to='/books'>Books</NavLink></li>
          <li>Outlines</li>
          <li>Story Elements</li>
          <ul>
            {elements.map(element => 
              <li>{element.name}</li>
            )}
          </ul>
        </ul>
      </nav>
    );
  }
}