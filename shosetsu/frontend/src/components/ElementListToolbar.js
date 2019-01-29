import React from 'react';

import AddElementModal from './modals/AddElementModal';

export default function ElementListToolbar(props) {
  return (
    <aside className="toolbar">
      <AddElementModal {...props} />
    </aside>
  );
}
