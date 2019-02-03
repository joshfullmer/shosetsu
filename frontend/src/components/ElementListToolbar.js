import React from 'react';

import AddElementModal from './modals/AddElementModal';
import Toolbar from './styled/Toolbar';

export default function ElementListToolbar(props) {
  return (
    <Toolbar>
      <AddElementModal {...props} />
    </Toolbar>
  );
}
