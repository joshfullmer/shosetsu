import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import InstanceList from './InstanceList';
import ElementListToolbar from './ElementListToolbar';
import ElementListBreadcrumbs from './breadcrumbs/ElementListBreadcrumbs';
import Body from './styled/Body';
import Main from './styled/Main';

const ElementListBody = styled(Body)`
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

const ElementListContainer = styled(Main)`
  overflow: auto;
`;

export default class ElementList extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    project: { id: this.props.match.params.project_id },
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
      <ElementListBody>
        <ElementListBreadcrumbs project={project} loading={loading} />
        <ElementListToolbar {...this.props} project={project} />
        <ElementListContainer>
          {loading ? (
            <p>Loading...</p>
          ) : (
            elements.map(element => (
              <InstanceList key={element.id} project={project} element={element} {...this.props} />
            ))
          )}
        </ElementListContainer>
      </ElementListBody>
    );
  }
}
