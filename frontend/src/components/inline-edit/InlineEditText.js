import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InlineEditText extends Component {
  static propTypes = {
    initialValue: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired
  };

  state = {
    editable: false
  };

  text = React.createRef();

  // Emulate state
  // Can't have state handle the value
  // eslint-disable-next-line react/destructuring-assignment
  value = this.props.initialValue;

  canEdit = () => {
    this.setState({ editable: true }, () => {
      this.text.current.focus();
    });
  };

  canNotEdit = (e) => {
    const { handleSave } = this.props;
    if (e.target.innerText !== this.value) {
      handleSave(e.target.innerText);
    }
    this.value = e.target.innerText;
    this.setState({ editable: false });
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.preventDefault();
      this.text.current.blur();
    }
  };

  render() {
    const { tag } = this.props;
    const Tag = tag;
    const { editable } = this.state;
    return (
      <Tag
        ref={this.text}
        onClick={this.canEdit}
        onBlur={this.canNotEdit}
        contentEditable={editable}
        suppressContentEditableWarning
        onKeyDown={this.handleKeyDown}
      >
        {this.value}
      </Tag>
    );
  }
}
