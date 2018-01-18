import React, { Component } from 'react';

import './styles.scss';

export default class CalendarBody extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { coord } = this.props;
    const range = new Array(coord.dateLength).fill(0).map((d, i) => i + 1);

    return (
      <g className="one-calendar-body">
        {range.map((d, i) => {
          const { x, y, width, height } = coord.rect(i);
          return (
            <g key={i} transform={`translate(${x}, ${y})`}>
              <rect x={0} y={0} width={width} height={height} />
              <text x={width / 2} y={height / 2}>{d}</text>
            </g>
          );
        })}
      </g>
    )
  }
}