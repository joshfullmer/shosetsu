import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title';
import ChapterDetailToolbar from './ChapterDetailToolbar';
import ChapterDetailSidebar from './ChapterDetailSidebar';


export default class ChapterDetail extends Component {

  state = {
    chapter: {id: this.props.match.params.chapter_id},
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.props.match.params.project_id}/book/${this.props.match.params.book_id}/chapter/${this.state.chapter.id}/`)
      .then(response => {
        this.setState({
          chapter: response.data,
          loading: false
        });
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching chapter data', error);
      });
  }

  delete = () => {
    axios.delete(`http://127.0.0.1:8000/project/${this.props.match.params.project_id}/book/${this.props.match.params.book_id}/chapter/${this.state.chapter.id}/`)
      .then(() => {
        this.props.history.push(`/project/${this.props.match.params.project_id}/book/${this.props.match.params.book_id}/`);
      })
      .catch(error => {
        console.log('Error deleting book', error)
      });
  }

  render() {
    let chapter = this.state.chapter;

    return (
      <div className="chapter-body body">
        <Title title={`Chapter Title: ${chapter.title}`} />
        <div className="chapter-content">
          <main className="chapter-editor" contentEditable>
            {chapter.content}
          </main>
          <ChapterDetailSidebar chapter={chapter} />
        </div>
        <ChapterDetailToolbar delete={this.delete} />
      </div>
    );
  }
}