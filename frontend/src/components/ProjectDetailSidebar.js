import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Sidebar from './styled/Sidebar';

export default class ProjectDetailSidebar extends PureComponent {
  static propTypes = {
    project: PropTypes.object.isRequired
  };

  render() {
    const { project } = this.props;
    return (
      <Sidebar>
        <p>{project.description}</p>
        <h2>Notes</h2>
        <p>Additional Notes</p>
      </Sidebar>
    );
  }
}
