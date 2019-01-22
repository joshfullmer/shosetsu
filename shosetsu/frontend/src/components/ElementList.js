import React, { Component } from 'react';
import axios from 'axios';

import InstanceList from './InstanceList';
import ElementListToolbar from './ElementListToolbar';
import ElementListBreadcrumbs from './breadcrumbs/ElementListBreadcrumbs';

export default class ElementList extends Component {

  state = {
    elements: [],
    project_id: this.props.match.params.project_id,
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/project/${this.state.project_id}/element/`)
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
        <ElementListBreadcrumbs
          elements={this.state.elements}
          loading={this.state.loading}
        />
        <ElementListToolbar {...this.props} />
        <main className="elementlist-container">
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