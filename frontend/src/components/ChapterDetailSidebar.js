import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Sidebar from './styled/Sidebar';

export default class ChapterDetailSidebar extends PureComponent {
  static propTypes = {
    chapter: PropTypes.object.isRequired
  };

  render() {
    const { chapter } = this.props;
    return (
      <Sidebar>
        <h2>Notes</h2>
        <p>{chapter.notes}</p>
      </Sidebar>
    );
  }
}
