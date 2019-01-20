import React, { Component } from 'react'

export default class InlineEditText extends Component {

  state = {
    editable: false,
    value: undefined
  }

  text = React.createRef()

  componentDidMount() {
    this.setState({value: this.props.initialValue})
  }

  canEdit = () => {
    this.setState(
      {editable: true},
      () => {this.text.current.focus()}
    )

  }

  canNotEdit = e => {
    this.setState(
      {
        editable: false,
        value: e.target.innerText
      },
      () => this.props.handleSave(this.state.value)
    )
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
        onKeyDown={this.handleKeyDown}
      >
        {this.state.value || this.props.initialValue}
      </Tag>
    )
  }
}