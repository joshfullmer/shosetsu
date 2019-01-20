import React, { Component } from 'react'
import axios from 'axios'

import Title from './Title'

export default class InstanceDetail extends Component {

  state = {
    instance: {id: this.props.match.params.instance_id},
    project_id: this.props.match.params.project_id,
    element_id: this.props.match.params.element_id,
    loading: true
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/project/${this.state.project_id}/element/${this.state.element_id}/instance/${this.state.instance.id}/`)
      .then(response => {
        this.setState({
          instance: response.data
        })
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching element instance data', error)
      })
    axios.get(`http://127.0.0.1:8000/project/${this.state.project_id}/element/${this.state.element_id}/field/`)
      .then(response => {
        this.setState({
          fields: response.data,
          loading: false
        })
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          this.props.history.push('/404')
        }
        console.log('Error fetching element field data', error)
      })
  }

  render() {
    let instance = this.state.instance;

    return (
      <div className="instance-body body">
        <Title title={(this.state.loading) ? "Loading..." : instance.name} />
        <main className="instance-container">
          {(this.state.loading)
            ? <p>Loading...</p>
            : this.state.fields.map(field => 
                <p>{field.label}: {instance[field.name]}</p>
          )}
        </main>
      </div>
    )
  }
}