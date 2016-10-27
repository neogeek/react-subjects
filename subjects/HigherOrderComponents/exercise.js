////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make `withMousePosition`a a "higher-order component" that sends the mouse
// position to the component as props.
//
// hint: use `event.clientX` and `event.clientY`

import React from 'react'
import { render } from 'react-dom'

const withMousePosition = (Component) => {
  return class Mouse extends React.Component {

    state = {
      mouse: {
        x: 0,
        y: 0
      }
    }

    render () {

      return (<div style={{ 'width': '100%', 'height': '100%' }} onMouseMove={(e) => {

        this.setState({
          mouse: {
            x: e.clientX,
            y: e.clientY
          }
        })

      }}><Component mouse={this.state.mouse}/></div>)

    }

  }
}

class App extends React.Component {

  static propTypes = {
    mouse: React.PropTypes.shape({
      x: React.PropTypes.number.isRequired,
      y: React.PropTypes.number.isRequired
    }).isRequired
  }

  render() {
    return (
      <div>
        <h1>With the mouse!</h1>
        <pre>{JSON.stringify(this.props.mouse, null, 2)}</pre>
      </div>
    )
  }
}

const AppWithMouse = withMousePosition(App)

render(<AppWithMouse/>, document.getElementById('app'))
