import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';

import { uuid } from './lib/common';
import Ele from './element';
import Brush from './components/brush';
import XAxis from './components/x-axis';
import YAxis from './components/y-axis';
import Calendar from './components/calendar';
import Container from './components/container';

import COORD from './coordinate';

const BRUSH_HEIGHT = 20;
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
  };

  render() {
    let { option, rect: { x, y, width, height } } = this.props;

    const showX = Chart.show(option.coordinate, 'x.show');
    const showY = Chart.show(option.coordinate, 'y.show');
    const showBrush = option.brush;

    let brushedX = 0, brushedY = 0, brushedWidth = width;
    if (showBrush) {
      brushedX = this.scale(0);
      brushedY = y;
      brushedWidth = this.scale(width) - brushedX;
      height = height - BRUSH_HEIGHT;
    }

    const Coord = COORD[option.coordinate.type];

    const xAxisHeight = showX ? Coord.axisHeight(option) : 0;
    const yAxisWidth = showY ? YAXIS_WIDTH : 0;

    const coord = new Coord({
      option: option.coordinate,
      children: option.children,
      width: Math.abs(brushedWidth) - yAxisWidth,
      height: Math.abs(height) - xAxisHeight
    });

    const clipPathId = 'c' + uuid();

    return (
      <Container {...{x, y, width, height, clipPathId, brushedX, brushedY}}>
        <g transform={`translate(${brushedX + yAxisWidth}, ${brushedY})`} clipPath={`url(#${clipPathId})`}>
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

        {showBrush && (
          <Brush
            ref="brush"
            width={width}
            height={BRUSH_HEIGHT}
            offset={[0, height]}
            onBrushed={this.handleBrushed}
          />
        )}
      </Container>
    );
  }
}

export default Chart;