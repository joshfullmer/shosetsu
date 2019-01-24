import React, { Component } from 'react';
import axios from 'axios';

import InstanceList from './InstanceList';
import ElementListToolbar from './ElementListToolbar';
import ElementListBreadcrumbs from './breadcrumbs/ElementListBreadcrumbs';

export default class ElementList extends Component {

  state = {
    elements: [],
    project: {id: this.props.match.params.project_id},
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/project/${this.state.project.id}/element/`)
      .then(response => {
        this.setState({
          elements: response.data.elements,
          project: response.data.project,
          loading: false
        })
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching and parsing element data', error)
      })
  }

  render() {
    let project = this.state.project
    return (
      <div className="elementlist-body body">
        <ElementListBreadcrumbs
          project={this.state.project}
          loading={this.state.loading}
        />
        <ElementListToolbar {...this.props} />
        <main className="elementlist-container">
          {(this.state.loading)
            ? <p>Loading...</p>
            : this.state.elements.map(element => 
                <InstanceList
                  key={element.id}
                  project={project}
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