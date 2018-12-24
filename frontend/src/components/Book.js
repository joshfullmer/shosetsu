import React, { Component } from 'react';

export default class Book extends Component {
  render() {
    return (
      <div className="book">
        <header>Book Title</header>
        <p>Book Description</p>
      </div>
    );
  }
}