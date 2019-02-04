import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ElementDetailToolbar from './ElementDetailToolbar';
import ElementDetailBreadcrumbs from './breadcrumbs/ElementDetailBreadcrumbs';
import InlineEditText from './inline-edit/InlineEditText';
import Body from './styled/Body';
import Main from './styled/Main';

axios.defaults.headers.Authorization = `JWT ${localStorage.getItem('token')}`;

const ElementDetailBody = styled(Body)`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: inherit;
  grid-template-areas:
    'title'
    'main'
    'toolbar';

  @media (min-width: 768px) {
    grid-template-columns: 3fr 1fr;
    grid-template-rows: inherit;
    grid-template-areas:
      'title toolbar'
      'main main'
      'main main';
  }
`;

const ElementDetailContainer = styled(Main)`
  overflow: auto;
`;

const InstanceData = styled.table`
  border-collapse: collapse;

  td,
  th {
    background-color: sandybrown;
    border: 1px solid white;
    padding: 8px;
  }
`;

export default class ElementDetail extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    removeElementFromProject: PropTypes.func.isRequired,
    updateElementName: PropTypes.func.isRequired
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    project: { id: this.props.match.params.project_id },
    // eslint-disable-next-line react/destructuring-assignment
    element: { id: this.props.match.params.element_id },
    fields: [],
    instances: [],
    loading: true
  };

  componentDidMount() {
    const { project, element } = this.state;
    const { history } = this.props;
    axios
      .all([
        axios.get(`/api/project/${project.id}/element/${element.id}/`),
        axios.get(`/api/project/${project.id}/element/${element.id}/instance/`)
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
      .delete(`/api/project/${project.id}/element/${element.id}/`)
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
      .patch(`/api/project/${project.id}/element/${element.id}/`, data)
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
        `/api/project/${project.id}/element/${element.id}/instance/${
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

  // eslint-disable-next-line camelcase
  updateFieldValue = (value, element_instance_id, field_name) => {
    const { fieldIds } = this.state;
    const { history } = this.props;
    // eslint-disable-next-line camelcase
    const element_field_id = fieldIds[field_name];
    const data = {
      element_instance_id,
      element_field_id,
      value
    };
    axios.post('/api/element-value/', data).catch((error) => {
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
      <ElementDetailBody>
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
          project={project}
          element={element}
          deleteElement={this.deleteElement}
        />
        {/* TODO: split the table into different components */}
        <ElementDetailContainer>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <InstanceData>
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
            </InstanceData>
          )}
        </ElementDetailContainer>
      </ElementDetailBody>
    );
  }
}
