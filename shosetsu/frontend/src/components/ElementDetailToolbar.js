import React from 'react';
import PropTypes from 'prop-types';

import AddFieldModal from './modals/AddFieldModal';
import AddInstanceModal from './modals/AddInstanceModal';

const ElementDetailToolbar = (props) => {
  const { deleteElement } = props;
  return (
    <aside className="toolbar">
      <AddFieldModal {...props} />
      <AddInstanceModal {...props} />
      <button type="button" onClick={deleteElement}>
        Delete Element
      </button>
    </aside>
  );
};

ElementDetailToolbar.propTypes = {
  deleteElement: PropTypes.func.isRequired
};

export default ElementDetailToolbar;
