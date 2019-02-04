import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Toolbar from './styled/Toolbar';

export default class ChapterDetailToolbar extends PureComponent {
  static propTypes = {
    deleteChapter: PropTypes.func.isRequired
  };

  render() {
    const { deleteChapter } = this.props;
    return (
      <Toolbar>
        <button type="button" onClick={deleteChapter}>
          Delete
        </button>
      </Toolbar>
    );
  }
}
