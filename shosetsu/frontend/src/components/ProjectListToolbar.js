import React from 'react';
import AddProjectModal from './modals/AddProjectModal';

export default function ProjectListToolbar(props) {
  return (
    <aside className="toolbar">
      <AddProjectModal {...props} />
    </aside>
  );
}
