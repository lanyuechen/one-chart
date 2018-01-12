import React, { Component } from 'react';

import Ele from '../element';
import Chart from '../index';

import Coordinate from '../coordinate/calendar';

class CalendarLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { option, rect: { x, y, width, height }, clipPathId } = this.props;

    const coord = new Coordinate({
      option: option.coordinate,
      children: option.children,
      width: Math.abs(width),
      height: Math.abs(height)
    });

    return (
      <g transform={`translate(${x}, ${y})`} clipPath={`url(#${clipPathId})`}>
        {option.children && option.children.map((d, i) => {

          const rect = coord.rect(i);

          return d.type === 'chart' ? (
            <Chart key={i} option={d} rect={rect} />
          ) : (
            <Ele
              key={i}
              option={option}
              rect={rect}
              graphic={coord.graphic(rect, d)}
            />
          );
        })}
      </g>
    );
  }
}

export default CalendarLayout;