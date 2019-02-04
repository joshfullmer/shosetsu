import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AddFieldModal from './modals/AddFieldModal';
import AddInstanceModal from './modals/AddInstanceModal';
import Toolbar from './styled/Toolbar';

export default class ElementDetailToolbar extends PureComponent {
  static propTypes = {
    deleteElement: PropTypes.func.isRequired
  };

  render() {
    const { deleteElement } = this.props;
    return (
      <Toolbar>
        <AddFieldModal {...this.props} />
        <AddInstanceModal {...this.props} />
        <button type="button" onClick={deleteElement}>
          Delete Element
        </button>
      </Toolbar>
    );
  }
}
