import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import InstanceDetailBreadcrumbs from './breadcrumbs/InstanceDetailBreadcrumbs';

export default class InstanceDetail extends Component {
  static propTypes = {
    match: PropTypes.shape.isRequired,
    history: PropTypes.shape.isRequired
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    project: { id: this.props.match.params.project_id },
    // eslint-disable-next-line react/destructuring-assignment
    element: { id: this.props.match.params.element_id },
    // eslint-disable-next-line react/destructuring-assignment
    instance: { id: this.props.match.params.instance_id },
    fields: [],
    loading: true
  };

  componentDidMount() {
    const { project, element, instance } = this.state;
    const { history } = this.props;
    axios
      .all([
        axios.get(
          `http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/instance/${
            instance.id
          }/`
        ),
        axios.get(`http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/field/`)
      ])
      .then(
        axios.spread((instanceResponse, fields) => {
          const newInstance = instanceResponse.data;
          this.setState({
            instance: newInstance,
            project: newInstance.project,
            element: newInstance.element,
            fields: fields.data,
            loading: false
          });
        })
      )
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error fetching and parsing instance/fields data', error);
      });
  }

  updateInstanceName = (name) => {
    const { project, element, instance } = this.state;
    const { history } = this.props;
    const data = {
      id: element.id,
      name
    };
    axios
      .patch(
        `http://127.0.0.1:8000/api/project/${project.id}/element/${element.id}/instance/${
          instance.id
        }/`,
        data
      )
      .then(() => {
        this.setState(prevState => ({
          instance: {
            ...prevState.instance,
            name: data.name
          }
        }));
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error updating instance name', error);
      });
  };

  render() {
    const {
      project, element, instance, fields, loading
    } = this.state;

    return (
      <div className="instance-body body">
        <InstanceDetailBreadcrumbs
          project={project}
          element={element}
          instance={instance}
          updateInstanceName={this.updateInstanceName}
          loading={loading}
        />
        <main className="instance-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>
                Name:
                {instance.name}
              </p>
              {fields.map(field => (
                <p key={field.label}>
                  {field.label}
:
                  {instance[field.name]}
                </p>
              ))}
            </>
          )}
        </main>
      </div>
    );
  }
}
