import React, { Component } from 'react';

class Practice extends Component {
  constructor() {
    super()
    this.state = {
      count: 0
    }
    this.clickHandle = this.clickHandle.bind(this)
  }

  clickHandle() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      }
  })
}

render() {
  return (
    <div className="container">
      <h1>{this.state.count}</h1>
      <h3>Test</h3>
      <button className="btn btn-primary text-center" onClick={this.clickHandle}>Click</button>
    </div>
  )
}
}

export default Practice;
