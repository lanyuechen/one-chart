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
          const rect = coord.rect(i);
          return (
            <g key={i} transform={`translate(${rect.x}, ${rect.y})`}>
              <rect x={0} y={0} width={rect.width} height={rect.height} fill="#aaa" />
              <text x={rect.width / 2} y={rect.height / 2}>{d}</text>
            </g>
          );
        })}
      </g>
    )
  }
}