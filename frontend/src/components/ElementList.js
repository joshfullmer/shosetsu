import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title';
import InstanceList from './InstanceList';
import AddElementModal from './modals/AddElementModal';

export default class ElementList extends Component {

  state = {
    elements: [],
    project_id: this.props.match.params.project_id,
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.state.project_id}/element/`)
      .then(response => {
        this.setState({
          elements: response.data,
          loading: false
        })
      })
      .catch(error => {
        console.log('Error fetching and parsing element data', error)
      });
  }

  render() {
    return (
      <div className="elementlist-body body">
        <Title title="Elements" />
        <main className="elementlist-container">
          <h2>Elements</h2>
          <AddElementModal
            buttonClassName=""
            addElementToProject={this.props.addElementToProject}
            {...this.props}
          />
          {(this.state.loading)
            ? <p>Loading...</p>
            : this.state.elements.map(element => 
                <InstanceList
                  key={element.id}
                  element={element}
                  {...this.props}
                />
              )
          }
        </main>
      </div>
    );
  }
}