import React, { Component } from 'react';
import axios from 'axios';

import Title from './Title'

export default class ElementDetail extends Component {

  state = {
    element: {id: this.props.match.params.element_id},
    fields: [],
    project_id: this.props.match.params.project_id,
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.state.project_id}/element/${this.state.element.id}/`)
      .then(response => {
        let fields = response.data.element_fields.reduce((map, field) => {
          map[field.name] = field.label;
          return map;
        }, {});
        this.setState({
          element: response.data,
          fields: fields
        })
      })
      .catch(error => {
        if (error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching and parsing element data', error)
      });
    axios.get(`http://127.0.0.1:8000/project/${this.state.project_id}/element/${this.state.element.id}/instance/`)
    .then(response => {
      this.setState({
        instances: response.data,
        loading: false
      })
    })
    .catch(error => {
      if (error.response.status === 404) {
        this.props.history.push('/404')
      }
      console.log('Error fetching and parsing instance data', error)
    });
  }

  delete = () => {
    axios.delete(`http://127.0.0.1:8000/project/${this.state.project_id}/element/${this.state.element.id}/`)
      .then(() => {
        this.props.history.push(`/project/${this.state.project_id}/element`);
      })
      .catch(error => {
        console.log('Error deleting element', error)
      });
  }

  render() {
    let title = (this.state.loading) ? "Loading..." : this.state.element.name;
    return (
      <div className="element-body body">
        <Title title={title} />
        <main>
          <header>{title}</header>
          <button onClick={this.delete}>Delete</button>
          {(this.state.loading)
            ? <p>Loading...</p>
            : <table className="instance-data">
                <thead>
                  <tr>
                    <th>Name</th>
                    {Object.keys(this.state.fields).map(key => 
                      <th key={key}>{this.state.fields[key]}</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {this.state.instances.map(instance =>
                    <tr key={instance.id}>
                      <td>{instance.name}</td>
                      {Object.keys(this.state.fields).map(key =>
                        <td key={`${instance.id}.${key}`}>{instance[key]}</td>
                      )}
                    </tr>
                  )}
                </tbody>
              </table>
          }
        </main>
      </div>
    );
  }
}