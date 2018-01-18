import React, { Component } from 'react';

import { CALENDAR_HEAD } from '../../constant';

export default class CalendarHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { coord, height } = this.props;

    return (
      <g>
        {CALENDAR_HEAD.map((d, i) => (
          <g key={i} transform={`translate(${i * coord.gridWidth}, 0)`}>
            <text>{d}</text>
          </g>
        ))}
      </g>
    )
  }
}