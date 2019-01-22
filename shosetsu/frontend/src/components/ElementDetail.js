import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

import ElementDetailToolbar from './ElementDetailToolbar'
import ElementDetailBreadcrumbs from './breadcrumbs/ElementDetailBreadcrumbs'

export default class ElementDetail extends Component {

  state = {
    element: {id: this.props.match.params.element_id},
    fields: [],
    project_id: this.props.match.params.project_id,
    loading: true
  }

  componentDidMount() {
    axios.all([
      axios.get(`http://127.0.0.1:8000/api/project/${this.state.project_id}/element/${this.state.element.id}/`),
      axios.get(`http://127.0.0.1:8000/api/project/${this.state.project_id}/element/${this.state.element.id}/instance/`),
    ])
      .then(axios.spread((element, instances) => {
        let fields = element.data.element_fields.reduce((map, field) => {
          map[field.name] = field.label;
          return map;
        }, {});
        this.setState({
          element: element.data,
          fields: fields,
          instances: instances.data,
          loading: false
        })
      }))
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching and parsing element/instance data', error)
      })
  }

  delete = () => {
    axios.delete(`http://127.0.0.1:8000/api/project/${this.state.project_id}/element/${this.state.element.id}/`)
      .then(() => {
        this.props.removeElementFromProject({id: this.state.element.id})
        this.props.history.push(`/project/${this.state.project_id}/element`);
      })
      .catch(error => {
        console.log('Error deleting element', error)
      });
  }

  updateElementName = name => {
    let data = {
      id: this.state.element.id,
      name: name
    }
    axios.patch(`http://127.0.0.1:8000/api/project/${this.state.project_id}/element/${this.state.element.id}/`, data)
      .then(() => {
        this.setState(prevState => ({
          element: {
            ...prevState.element,
            name: data.name
          }
        }), this.props.updateElementName(data))
      })
      .catch(error => {
        console.log('Error updating element name', error)
      })
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
    return (
      <div className="element-body body">
        <ElementDetailBreadcrumbs
          element={this.state.element}
          updateElementName={this.updateElementName}
          loading={this.state.loading}
        />
        <ElementDetailToolbar 
          {...this.props}
          addField={this.addField}
          addInstance={this.addInstance}
          element={this.state.element}
          delete={this.delete}
        />
        {/* TODO: split the table into different components */}
        <main>
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