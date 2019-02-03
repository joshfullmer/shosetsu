import React from 'react';
import PropTypes from 'prop-types';

import AddFieldModal from './modals/AddFieldModal';
import AddInstanceModal from './modals/AddInstanceModal';
import Toolbar from './styled/Toolbar';

const ElementDetailToolbar = (props) => {
  const { deleteElement } = props;
  return (
    <Toolbar>
      <AddFieldModal {...props} />
      <AddInstanceModal {...props} />
      <button type="button" onClick={deleteElement}>
        Delete Element
      </button>
    </Toolbar>
  );
};

ElementDetailToolbar.propTypes = {
  deleteElement: PropTypes.func.isRequired
};

export default ElementDetailToolbar;
