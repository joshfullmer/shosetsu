import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import ElementDetailToolbar from './ElementDetailToolbar';
import ElementDetailBreadcrumbs from './breadcrumbs/ElementDetailBreadcrumbs';
import InlineEditText from './inline-edit/InlineEditText';

export default class ElementDetail extends Component {
  static propTypes = {
    match: PropTypes.shape.isRequired,
    history: PropTypes.shape.isRequired,
    removeElementFromProject: PropTypes.func.isRequired,
    updateElementName: PropTypes.func.isRequired
  };

  state = {
    get project() {
      const { match } = this.props;
      return { id: match.params.project_id };
    },
    get element() {
      const { match } = this.props;
      return { id: match.params.element_id };
    },
    fields: [],
    instances: [],
    loading: true
  };

  componentDidMount() {
    const { project, element } = this.state;
    const { history } = this.props;
    axios
      .all([
        axios.get(`http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/`),
        axios.get(`http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/instance/`)
      ])
      .then(
        axios.spread((elementResponse, instances) => {
          const fields = elementResponse.data.element_fields.reduce((map, field) => {
            const obj = map;
            obj[field.name] = field.label;
            return obj;
          }, {});
          const fieldIds = elementResponse.data.element_fields.reduce((map, field) => {
            const obj = map;
            obj[field.name] = field.id;
            return obj;
          }, {});
          this.setState({
            element: elementResponse.data,
            fields,
            instances: instances.data.instances,
            project: instances.data.project,
            fieldIds,
            loading: false
          });
        })
      )
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error fetching and parsing element/instance data', error);
      });
  }

  deleteElement = () => {
    const { project, element } = this.state;
    const { history, removeElementFromProject } = this.props;
    axios
      .delete(`http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/`)
      .then(() => {
        removeElementFromProject({ id: element.id });
        history.push(`/project/${project.id}/element`);
      })
      .catch((error) => {
        console.log('Error deleting element', error);
      });
  };

  updateElementName = (name) => {
    const { project, element } = this.state;
    const { updateElementName } = this.props;
    const data = {
      id: element.id,
      name
    };
    axios
      .patch(`http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/`, data)
      .then(() => {
        this.setState(
          prevState => ({
            element: {
              ...prevState.element,
              name: data.name
            }
          }),
          updateElementName(data)
        );
      })
      .catch((error) => {
        console.log('Error updating element name', error);
      });
  };

  addField = (field) => {
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [field.name]: field.label
      }
    }));
  };

  addInstance = (instance) => {
    this.setState(prevState => ({
      instances: [...prevState.instances, instance]
    }));
  };

  deleteInstance = (instanceToDelete) => {
    const { project, element } = this.state;
    axios
      .delete(
        `http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/instance/${
          instanceToDelete.id
        }/`
      )
      .then(() => {
        this.setState(prevState => ({
          instances: prevState.instances.filter(instance => instance.id !== instanceToDelete.id)
        }));
      })
      .catch((error) => {
        console.log('Error deleting element instance', error);
      });
  };

  updateFieldValue = (value, elementInstanceId, fieldName) => {
    const { fieldIds } = this.state;
    const { history } = this.props;
    const elementFieldId = fieldIds[fieldName];
    const data = {
      elementInstanceId,
      elementFieldId,
      value
    };
    axios.post('http://127.0.0.1:8000/api/element-value/', data).catch((error) => {
      if (error.response && error.response.status === 404) {
        history.push('/404');
      }
      console.log('Error fetching element instance data', error);
    });
  };

  render() {
    const {
      project, element, fields, instances, loading
    } = this.state;
    return (
      <div className="element-body body">
        <ElementDetailBreadcrumbs
          project={project}
          element={element}
          updateElementName={this.updateElementName}
          loading={loading}
        />
        <ElementDetailToolbar
          {...this.props}
          addField={this.addField}
          addInstance={this.addInstance}
          element={element}
          deleteElement={this.deleteElement}
        />
        {/* TODO: split the table into different components */}
        <main>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="instance-data">
              <thead>
                <tr>
                  <th>X</th>
                  <th>Name</th>
                  {Object.keys(fields).map(key => (
                    <th key={key}>{fields[key]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {instances.map(instance => (
                  <tr key={instance.id}>
                    <td>
                      <button type="button" onClick={() => this.deleteInstance(instance)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <NavLink
                        to={`/project/${project.id}/element/${element.id}/instance/${instance.id}`}
                      >
                        <div>
                          <header>{instance.name}</header>
                        </div>
                      </NavLink>
                    </td>
                    {Object.keys(fields).map(key => (
                      <InlineEditText
                        key={`${instance.id}.${key}`}
                        tag="td"
                        initialValue={instance[key]}
                        handleSave={value => this.updateFieldValue(value, instance.id, key)}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    );
  }
}
