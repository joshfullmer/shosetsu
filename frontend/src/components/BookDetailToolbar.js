import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import AddChapterModal from './modals/AddChapterModal';
import Toolbar from './styled/Toolbar';

export default class BookDetailToolbar extends PureComponent {
  static propTypes = {
    deleteBook: PropTypes.func.isRequired
  };

  render() {
    const { deleteBook } = this.props;
    return (
      <Toolbar>
        <AddChapterModal {...this.props} />
        <button type="button" onClick={deleteBook}>
          Delete
        </button>
      </Toolbar>
    );
  }
}
