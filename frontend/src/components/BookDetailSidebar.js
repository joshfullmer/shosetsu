import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Sidebar from './styled/Sidebar';

export default class BookDetailSidebar extends PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired
  };

  render() {
    const { book } = this.props;

    return (
      <Sidebar>
        <h2>Description</h2>
        <p>{book.description}</p>
        <h2>Notes</h2>
        <p>Additional Notes</p>
      </Sidebar>
    );
  }
}
