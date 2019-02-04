import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AddBookModal from './modals/AddBookModal';
import AddElementModal from './modals/AddElementModal';
import Toolbar from './styled/Toolbar';

export default class ProjectDetailToolbar extends PureComponent {
  static propTypes = {
    deleteProject: PropTypes.func.isRequired
  };

  render() {
    const { deleteProject } = this.props;
    return (
      <Toolbar>
        <AddBookModal {...this.props} />
        <AddElementModal {...this.props} />
        <button type="button" onClick={deleteProject}>
          Delete
        </button>
      </Toolbar>
    );
  }
}
