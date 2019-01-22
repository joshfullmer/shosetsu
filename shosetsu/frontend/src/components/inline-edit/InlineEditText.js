import React, { Component } from 'react'

export default class InlineEditText extends Component {

  state = {
    editable: false
  }

  text = React.createRef()

  // Emulate state
  // Can't have state handle the value
  value = this.props.initialValue

  canEdit = () => {
    this.setState(
      {editable: true},
      () => {this.text.current.focus()}
    )

  }

  canNotEdit = e => {
    if (e.target.innerText !== this.value) {
      this.props.handleSave(e.target.innerText)
    }
    this.value = e.target.innerText
    this.setState({editable: false})
  }

  handleKeyDown = e => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      e.preventDefault()
      this.text.current.blur()
    }
  }

  render() {

    let Tag = this.props.tag;

    return (
      <Tag
        ref={this.text}
        onClick={this.canEdit}
        onBlur={this.canNotEdit}
        contentEditable={this.state.editable}
        suppressContentEditableWarning={true}
        onKeyDown={this.handleKeyDown}
      >
        {this.value}
      </Tag>
    )
  }
}