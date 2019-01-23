import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

import ElementDetailToolbar from './ElementDetailToolbar'
import ElementDetailBreadcrumbs from './breadcrumbs/ElementDetailBreadcrumbs'
import InlineEditText from './inline-edit/InlineEditText';

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
        let field_ids = element.data.element_fields.reduce((map, field) => {
          map[field.name] = field.id
          return map
        }, {})
        this.setState({
          element: element.data,
          fields: fields,
          instances: instances.data,
          field_ids: field_ids,
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

  deleteElement = () => {
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

  deleteInstance = instanceToDelete => {
    axios.delete(`http://127.0.0.1:8000/api/project/${this.state.project_id}/element/${this.state.element.id}/instance/${instanceToDelete.id}/`)
      .then(() => {
        this.setState(prevState => ({
          instances: prevState.instances.filter(instance => instance.id !== instanceToDelete.id)
        }))
      })
      .catch(error => {
        console.log('Error deleting element instance', error)
      });
  }

  updateFieldValue = (value, element_instance_id, field_name) => {
    let element_field_id = this.state.field_ids[field_name]
    let data = {
      element_instance_id,
      element_field_id,
      value
    }
    axios.post('http://127.0.0.1:8000/api/element-value/', data)
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching element instance data', error)
      })
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
          deleteElement={this.deleteElement}
        />
        {/* TODO: split the table into different components */}
        <main>
          {(this.state.loading)
            ? <p>Loading...</p>
            : <table className="instance-data">
                <thead>
                  <tr>
                    <th>X</th>
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
                        <button onClick={() => this.deleteInstance(instance)}>Delete</button>
                      </td>
                      <td>
                        <NavLink to={`/project/${this.state.project_id}/element/${this.state.element.id}/instance/${instance.id}`}>
                          <div><header>{instance.name}</header></div>
                        </NavLink>
                      </td>
                      {Object.keys(this.state.fields).map(key =>
                          <InlineEditText
                            key={`${instance.id}.${key}`}
                            tag="td"
                            initialValue={instance[key]}
                            handleSave={(value) => this.updateFieldValue(value, instance.id, key)}
                          />
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