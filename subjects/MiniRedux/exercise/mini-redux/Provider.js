import React from 'react'

class Provider extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    store: React.PropTypes.any
  }
  static childContextTypes = {
    store: React.PropTypes.any
  }
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

export default Provider
