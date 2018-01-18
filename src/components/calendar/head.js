import React, { Component } from 'react';

import { CALENDAR_HEAD } from '../../constant';

import './styles.scss';

export default class CalendarHead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { coord, height } = this.props;

    return (
      <g className="one-calendar-head">
        {CALENDAR_HEAD.map((d, i) => (
          <g key={i} transform={`translate(${i * coord.gridWidth}, 0)`}>
            <text x={coord.gridWidth / 2} y={height / 2}>{d}</text>
          </g>
        ))}
      </g>
    )
  }
}