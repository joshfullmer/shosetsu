import React from 'react';

import AddBookModal from './modals/AddBookModal';
import Toolbar from './styled/Toolbar';

export default function BookListToolbar(props) {
  return (
    <Toolbar>
      <AddBookModal {...props} />
    </Toolbar>
  );
}
