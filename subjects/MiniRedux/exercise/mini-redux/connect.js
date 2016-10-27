import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    return class Counter extends React.Component {

      static contextTypes = {
        store: React.PropTypes.any
      }

      render () {
        return (<Component store={this.context.store}/>)
      }

    }
  }
}
