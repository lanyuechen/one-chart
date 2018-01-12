import React, { Component } from 'react';

import Ele from '../element';
import XAxis from '../components/x-axis';
import YAxis from '../components/y-axis';
import Chart from '../index';

import Coordinate from '../coordinate/rect';

const YAXIS_WIDTH = 20;

class RectLayout extends Component {
  constructor(props) {
    super(props);
  }

  static show(option, key) {
    const show = _.get(option, key);
    if (typeof(show) === 'undefined') {
      return option.show;
    }
    return show;
  }

  render() {
    let { option, rect: { x, y, width, height }, clipPathId } = this.props;

    const showX = RectLayout.show(option.coordinate, 'x.show');
    const showY = RectLayout.show(option.coordinate, 'y.show');

    const xAxisHeight = showX ? Coordinate.axisHeight(option) : 0;
    const yAxisWidth = showY ? YAXIS_WIDTH : 0;

    const coord = new Coordinate({
      option: option.coordinate,
      children: option.children,
      width: Math.abs(width) - yAxisWidth,
      height: Math.abs(height) - xAxisHeight
    });

    return (
      <g>
        <g transform={`translate(${x + yAxisWidth}, ${y})`} clipPath={`url(#${clipPathId})`}>
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
          {showX && <XAxis {...coord.xAxis} offset={[0, height - xAxisHeight]} />}
        </g>

        {showY && <YAxis {...coord.yAxis} offset={[YAXIS_WIDTH, 0]} />}
      </g>
    );
  }
}

export default RectLayout;