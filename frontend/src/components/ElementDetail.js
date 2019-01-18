import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

import Title from './Title'
import AddFieldModal from './modals/AddFieldModal';
import AddInstanceModal from './modals/AddInstanceModal';

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
      .then(response => {
        this.props.removeElementFromProject({id: this.state.element.id})
        this.props.history.push(`/project/${this.state.project_id}/element`);
      })
      .catch(error => {
        console.log('Error deleting element', error)
      });
  }

  addField = field => {
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [field.name]: field.label
      }
    }))
  }

  addInstance = instance => {
    this.setState(prevState => ({
      instances: [...prevState.instances, instance]
    }))
  }

  render() {
    let title = (this.state.loading) ? "Loading..." : this.state.element.name;
    return (
      <div className="element-body body">
        <Title title={title} />
        <main>
          <header>{title}</header>
          <AddFieldModal 
            buttonClassName=""
            addField={this.addField}
            {...this.props}
          />
          <AddInstanceModal
            buttonClassName=""
            addInstance={this.addInstance}
            element={this.state.element}
            {...this.props}
          />
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
                      <td>
                      <NavLink to={`/project/${this.state.project_id}/element/${this.state.element.id}/instance/${instance.id}`}>
                        <div><header>{instance.name}</header></div>
                      </NavLink>
                      </td>
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