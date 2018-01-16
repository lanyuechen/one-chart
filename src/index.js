import React, { Component } from 'react';
import * as d3 from 'd3';

import { uuid } from './lib/common';
import Ele from './element';
import Brush from './components/brush';
import Container from './components/container';

import LAYOUT from './layout';
import { BRUSH_HEIGHT } from './constant';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.updateScale();
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

    const showBrush = option.brush;
    const coordType = option.coordinate.type;

    let brushedX = 0, brushedY = 0, brushedWidth = width;
    if (showBrush) {
      brushedX = this.scale(0);
      brushedY = y;
      brushedWidth = this.scale(width) - brushedX;
      height = height - BRUSH_HEIGHT;
    }

    const Layout = LAYOUT[coordType];

    const clipPathId = 'c' + uuid();

    return (
      <Container {...{x, y, width, height, clipPathId, brushedX, brushedY}}>
        <Layout
          option={option}
          rect={{x: brushedX, y: brushedY, width: brushedWidth, height}}
          clipPathId={clipPathId}
        />

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