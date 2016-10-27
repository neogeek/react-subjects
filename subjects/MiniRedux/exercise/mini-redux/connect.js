import React from 'react'

export default function connect(mapStateToProps) {
  return function (Component) {
    return class Counter extends React.Component {

      state = {
        counter: 0
      }

      static contextTypes = {
        store: React.PropTypes.object
      }

      componentWillMount() {

        this.context.store.listen((data) => {

          this.setState({
            counter: this.context.store.getState()
          })

        })

      }

      render () {
        const storeState = this.context.store.getState()
        const props = mapStateToProps(storeState)
        return (<Component {...props} {...this.props} dispatch={this.context.store.dispatch}/>)
      }

    }
  }
}
