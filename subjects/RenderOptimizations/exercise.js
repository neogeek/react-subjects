////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
//
// Got extra time?
//
// - Render fewer rows as the size of the window changes (Hint: Listen
//   for the window's "resize" event)
// - Try rendering a few rows above and beneath the visible area to
//   prevent tearing when scrolling quickly
// - Remember scroll position when you refresh the page
////////////////////////////////////////////////////////////////////////////////
import React, { PropTypes } from 'react'
import { render, findDOMNode } from 'react-dom'
import * as RainbowListDelegate from './RainbowListDelegate'
import './styles'

class RainbowList extends React.Component {
  static propTypes = {
    numRows: PropTypes.number.isRequired,
    rowHeight: PropTypes.number.isRequired,
    renderRowAtIndex: PropTypes.func.isRequired
  }

  state = {
    scrollTop: 0,
    viewportHeight: 0
  }

  componentDidMount () {

    this.setViewportHeight()

    window.addEventListener('resize', this.setViewportHeight)

  }

  setViewportHeight = () => {

      this.setState({
        viewportHeight: this.div.clientHeight
      })

  }

  render() {
    const { numRows, rowHeight, renderRowAtIndex } = this.props
    const totalHeight = numRows * rowHeight
    const scrollBuffer = 200
    const maxViewItems = Math.ceil((this.state.viewportHeight + scrollBuffer) / rowHeight)

    const items = []

    const startIndex = Math.round(this.state.scrollTop / rowHeight)

    let index = startIndex
    while (index < startIndex + maxViewItems) {
      items.push(<li key={index}>{renderRowAtIndex(index)}</li>)
      index++
    }

    return (
      <div ref={(div) => this.div = div} onScroll={(e) => {

          this.setState({
            scrollTop: e.target.scrollTop
          })

        }} style={{ height: '100%', overflowY: 'scroll' }}>
        <ol style={{ position: 'relative', transform: `translate3d(0, ${(startIndex * rowHeight)}px, 0)`, height: totalHeight }}>
          {items}
        </ol>
      </div>
    )
  }
}

render(
  <RainbowList
    numRows={500}
    rowHeight={RainbowListDelegate.rowHeight}
    renderRowAtIndex={RainbowListDelegate.renderRowAtIndex}
  />,
  document.getElementById('app')
)
