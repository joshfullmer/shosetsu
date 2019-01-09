import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';


export default class ChapterView extends Component {

  state = {
    chapter: {},
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/chapter/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          chapter: response.data,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching chapter data', error);
      });
  }

  render() {
    let chapter = this.state.chapter;

    return (
      <div className="chapter-body body">
        <Title title={`Chapter Title: ${chapter.title}`} />
        <div className="chapter-content">
          <main>
            <h2>Chapter Main</h2>
            <p>{chapter.content}</p>
          </main>
          <Sidebar title={chapter.notes} />
        </div>
        <Toolbar />
      </div>
    );
  }
}