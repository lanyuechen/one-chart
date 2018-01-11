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
    const { graphic, option } = this.props;

    return ELEMENT['rect'];
  };

  render() {
    const { x, y } = this.props.rect;
    const E = this.getEle();

    return (
      <g transform={`translate(${x}, ${y})`}>
        <E {...this.props} />
      </g>
    )
  }
}

export default Ele;