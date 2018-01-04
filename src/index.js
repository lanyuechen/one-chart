import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import { uuid } from './lib/common';
import Coordinate from './coordinate';
import Ele from './element';
import Brush from './components/brush';
import XAxis from './components/x-axis';
import YAxis from './components/y-axis';

const BRUSH_HEIGHT = 20;
const XAXIS_HEIGHT = 20;
const YAXIS_WIDTH = 20;

class Chart extends Component {
  constructor(props) {
    super(props);

    this.updateScale();
  }

  static show(option, key) {
    const show = _.get(option, key);
    if (typeof(show) === 'undefined') {
      return option.show;
    }
    return show;
  }

  static showX(option) {
    return Chart.show(option, 'x.show');
  }

  static showY(option) {
    return Chart.show(option, 'y.show');
  }

  componentDidUpdate() {
    this.updateScale();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.rect.width !== this.props.rect.width) {
      return true;
    }
    return false;
  }

  updateScale = () => {
    const { option, rect } = this.props;

    if (option.brush) {
      this.scale = this.scale || d3.scaleLinear();
      this.scale.domain([0, rect.width]).range([0, rect.width]);
      this.brushScale = this.scale.copy();
    }
  };

  handleBrushed = (s) => {
    const brush = this.refs.brush;
    if (!brush) {
      return;
    }

    s = s || this.brushScale.range();
    this.scale.domain(s.map(this.brushScale.invert, this.brushScale));

    this.forceUpdate();

    //d3.select(this.refs.rect).call(
    //  brush.zoom.transform,
    //  d3.zoomIdentity
    //    .scale(width / (s[1] - s[0]))
    //    .translate(-s[0], 0)
    //);
  };

  handleZoomed = (t) => {
    //this.scale.domain(t.rescaleX(this.brushScale).domain());
    //context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
  };

  render() {
    let { option, rect: { x, y, width, height } } = this.props;

    let x2 = x, y2 = y, oldWidth = width;
    if (option.brush) {
      x2 = this.scale(0);
      width = this.scale(width) - x2;
      height = height - BRUSH_HEIGHT;
    } else {
      x2 = 0;
      y2 = 0;
    }

    const showX = Chart.showX(option.coordinate);
    const showY = Chart.showY(option.coordinate);
    const xAxisHeight = showX ? XAXIS_HEIGHT : 0;
    const yAxisWidth = showY ? YAXIS_WIDTH : 0;

    const coord = new Coordinate({
      option: option.coordinate,
      children: option.children,
      width:  Math.abs(width) - yAxisWidth,
      height: Math.abs(height) - xAxisHeight
    });

    const clipId = 'c' + uuid();

    return (
      <g transform={`translate(${x}, ${y})`}>
        <defs>
          <clipPath id={clipId}>
            <rect transform={`translate(${-x2}, ${-y2})`} width={oldWidth} height={height} />
          </clipPath>
        </defs>

        <g transform={`translate(${x2 + yAxisWidth}, ${y2})`} clipPath={`url(#${clipId})`}>
          {option.children && option.children.map((d, i) => {
            const range = coord.yAxis.scale.range();
            let rect = {
              x: coord.x(i),
              y: range[1],
              width: coord.bw(i),
              height: range[0] - range[1]
            };

            if (d.type === 'chart') {
              return (
                <Chart key={i} option={d} rect={rect} />
              );
            }

            rect = {...rect, y: coord.yAxis.scale(d), height: coord.yAxis.scale(0) - coord.yAxis.scale(d)};
            return (
              <Ele key={i} option={option} rect={rect} data={d} />
            );
          })}
          {showX && (
            <g transform={`translate(0, ${height - xAxisHeight})`}>
              <XAxis {...coord.xAxis} />
            </g>
          )}
        </g>

        {showY && (
          <g transform={`translate(${YAXIS_WIDTH}, 0)`}>
            <YAxis {...coord.yAxis} />
          </g>
        )}

        {option.brush && (
          <g transform={`translate(0, ${height})`}>
            <Brush
              ref="brush"
              width={oldWidth}
              height={BRUSH_HEIGHT}
              onBrushed={this.handleBrushed}
              onZoomed={this.handleZoomed}
            />
          </g>
        )}
      </g>
    );
  }
}

export default Chart;