import React, { Component } from 'react';

import Ele from '../element';
import Chart from '../index';
import Coordinate from '../coordinate/calendar';
import Calendar from '../components/calendar';

class CalendarLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { option, rect: { x, y, width, height }, clipPathId } = this.props;

    const titleHeight = Math.abs(height) / 10;

    const coord = new Coordinate({
      option: option.coordinate,
      children: option.children,
      width: Math.abs(width),
      height: Math.abs(height) - titleHeight
    });

    return (
      <g transform={`translate(${x}, ${y})`} clipPath={`url(#${clipPathId})`}>
        <Calendar.Head coord={coord} height={titleHeight} />

        <g transform={`translate(0, ${titleHeight})`}>
          <Calendar.Body coord={coord} />

          {option.children && option.children.map((d, i) => {

            const rect = coord.rect(i);

            return d.type === 'chart' ? (
              <Chart key={i} option={d} rect={rect} />
            ) : (
              <Ele key={i} rect={rect} graphic={coord.graphic(rect, d)} />
            );
          })}
        </g>
      </g>
    );
  }
}

export default CalendarLayout;