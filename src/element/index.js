import React, { Component } from 'react';

import Rect from './rect';

const ELEMENT = {
  rect: Rect
};

class Ele extends Component {
  constructor(props) {
    super(props);
  }

  getEle = () => {
    const { graphic } = this.props;
    return ELEMENT[graphic.type];
  };

  render() {
    const { rect, graphic } = this.props;
    const { x, y } = rect;
    const E = this.getEle();

    return (
      <g transform={`translate(${x}, ${y})`}>
        <E {...graphic.feature} />
      </g>
    )
  }
}

export default Ele;