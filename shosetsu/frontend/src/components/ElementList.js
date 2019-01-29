import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import InstanceList from './InstanceList';
import ElementListToolbar from './ElementListToolbar';
import ElementListBreadcrumbs from './breadcrumbs/ElementListBreadcrumbs';

export default class ElementList extends Component {
  static propTypes = {
    match: PropTypes.shape.isRequired,
    history: PropTypes.shape.isRequired
  };

  state = {
    get project() {
      const { match } = this.props;
      return { id: match.params.project_id };
    },
    elements: [],
    loading: true
  };

  componentDidMount() {
    const { project } = this.state;
    const { history } = this.props;
    axios
      .get(`http://127.0.0.1:8000/api/project/${project.id}/element/`)
      .then((response) => {
        this.setState({
          elements: response.data.elements,
          project: response.data.project,
          loading: false
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          history.push('/404');
        }
        console.log('Error fetching and parsing element data', error);
      });
  }

  render() {
    const { project, elements, loading } = this.state;
    return (
      <div className="elementlist-body body">
        <ElementListBreadcrumbs project={project} loading={loading} />
        <ElementListToolbar {...this.props} />
        <main className="elementlist-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            elements.map(element => (
              <InstanceList key={element.id} project={project} element={element} {...this.props} />
            ))
          )}
        </main>
      </div>
    );
  }
}
