import React, { Component } from 'react'

export default class Nav extends Component {
  render() {
    return (
      <nav>
        Navigation
        <ul class="nav-list">
          <li>Books</li>
          <li>Chapters</li>
          <li>Outlines</li>
          <li>Characters</li>
          <li>Places</li>
        </ul>
      </nav>
    );
  }
}