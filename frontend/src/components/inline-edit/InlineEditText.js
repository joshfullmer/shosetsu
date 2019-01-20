import React, { Component } from 'react'

export default class InlineEditText extends Component {

  state = {
    editable: false,
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

  canNotEdit = () => {
    this.setState(
      {editable: false},
      () => {this.props.handleSave()}
    )
  }

  handleChange = e => {
    this.setState({value: e.target.value})
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
        {this.state.value}
      </Tag>
    )
  }
}