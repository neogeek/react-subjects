import React, { PropTypes } from 'react'
import connect from '../mini-redux/connect'

class App extends React.Component {

  state = {
    counter: 0
  }

  componentWillMount() {

    this.props.store.listen((data) => {

      this.setState({
        counter: this.props.store.getState()
      })

    })

  }

  increment = () => {
    this.props.store.dispatch({ type: 'INCREMENT' })
  }

  decrement = () => {
    this.props.store.dispatch({ type: 'DECREMENT' })
  }

  render() {
    return (
      <div>
        <h1>Mini Redux!</h1>
        <button onClick={this.increment}>Increment</button>{' '}
        {this.state.counter}{' '}
        <button onClick={this.decrement}>Decrement</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { counter: state }
}
export default connect(mapStateToProps)(App)
