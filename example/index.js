import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Chart from '../src';

import option from './option/complex';

class Demo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Chart option={option} rect={{x: 0, y: 0, width: 600, height: 400}} />
    );
  }
}

ReactDOM.render(<Demo/>, document.getElementById('app'));