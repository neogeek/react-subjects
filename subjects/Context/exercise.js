/*eslint-disable no-alert */
////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Using context, implement the <Form>, <SubmitButton>, and <TextInput>
// components such that:
//
// - Clicking the <SubmitButton> "submits" the form
// - Hitting "Enter" while in a <TextInput> submits the form
// - Don't use a <form> element, we're intentionally recreating the
//   browser's built-in behavior
//
// Got extra time?
//
// - Send the values of all the <TextInput>s to the <Form onChange> handler
//   without using DOM traversal APIs
// - Implement a <ResetButton> that resets the <TextInput>s in the form
//
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

class Form extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.node
  }
  static childContextTypes = {
    form: React.PropTypes.shape({
      onSubmit: React.PropTypes.func.isRequired
    })
  }
  getChildContext() {
    return {
      form: {
        onSubmit: this.props.onSubmit
      }
    }
  }
  render() {
    return <div>{this.props.children}</div>
  }
}

class SubmitButton extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }
  static contextTypes = {
    form: React.PropTypes.shape({
      onSubmit: React.PropTypes.func.isRequired
    })
  }
  render() {
    return <button onClick={this.context.form.onSubmit}>{this.props.children}</button>
  }
}

class TextInput extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string
  }
  static contextTypes = {
    form: React.PropTypes.shape({
      onSubmit: React.PropTypes.func.isRequired
    })
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.context.form.onSubmit()
    }
  }
  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        placeholder={this.props.placeholder}
        onKeyPress={this.handleKeyPress}
      />
    )
  }
}

class App extends React.Component {
  handleSubmit = () => {
    alert('YOU WIN!')
  }

  render() {
    return (
      <div>
        <h1>This isn't even my final <code>&lt;Form/&gt;</code>!</h1>

        <Form onSubmit={this.handleSubmit}>
          <p>
            <TextInput name="firstName" placeholder="First Name"/> {' '}
            <TextInput name="lastName" placeholder="Last Name"/>
          </p>
          <p>
            <SubmitButton>Submit</SubmitButton>
          </p>
        </Form>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'))
