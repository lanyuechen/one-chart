import React, { Component } from 'react';

class Container extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { x, y, width, height, clipPathId, brushedX, brushedY, children } = this.props;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <defs>
          <clipPath id={clipPathId}>
            <rect transform={`translate(${-brushedX}, ${-brushedY})`} width={width} height={height} />
          </clipPath>
        </defs>

        {children}
      </g>
    )
  }
}

export default Container;