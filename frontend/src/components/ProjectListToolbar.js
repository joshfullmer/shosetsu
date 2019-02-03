import React from 'react';

import AddProjectModal from './modals/AddProjectModal';
import Toolbar from './styled/Toolbar';

export default function ProjectListToolbar(props) {
  return (
    <Toolbar>
      <AddProjectModal {...props} />
    </Toolbar>
  );
}
