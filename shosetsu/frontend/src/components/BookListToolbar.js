import React from 'react';
import AddBookModal from './modals/AddBookModal';

export default function BookListToolbar(props) {
  return (
    <aside className="toolbar">
      <AddBookModal {...props} />
    </aside>
  );
}
