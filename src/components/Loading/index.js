import React, { Component } from 'react'

class Loading extends Component {
  render() {
  	return (
      <div className={'loading'}>
        <i className="glyphicon glyphicon-refresh"></i>
      </div>
    );
  }
}

export default Loading;