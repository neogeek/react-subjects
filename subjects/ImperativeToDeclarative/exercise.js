////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// This Modal, even though its a React component, has an imperative API to
// open and close it. Can you convert it to a declarative API?
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import $ from 'jquery'
import 'bootstrap-webpack'

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string.isRequired,
    children: PropTypes.node
  }

  componentDidMount () {
    this.toggleVisibility()
  }

  componentDidUpdate () {
    this.toggleVisibility()
  }

  toggleVisibility () {

    const { isOpen } = this.props

    if (isOpen) {
      $(this.modal).modal('show')
    } else {
      $(this.modal).modal('hide')
    }

  }

  render() {
    return (
      <div ref={(node) => this.modal = node} className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class App extends React.Component {

  state = {
    modalOpen: false
  }

  openModal = () => {
    this.setState({
      'modalOpen': true
    })
  }

  closeModal = () => {
    this.setState({
      'modalOpen': false
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Let’s make bootstrap modal declarative</h1>

        <button
          className="btn btn-primary"
          onClick={this.openModal}
        >open modal</button>

    <Modal title="Declarative is better" isOpen={this.state.modalOpen}>
          <p>Calling methods on instances is a FLOW not a STOCK!</p>
          <p>It’s the dynamic process, not the static program in text space.</p>
          <p>You have to experience it over time, rather than in snapshots of state.</p>
          <button
            onClick={this.closeModal}
            type="button"
            className="btn btn-default"
          >Close</button>
        </Modal>

      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))
