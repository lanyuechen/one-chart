import * as d3 from 'd3';
import _ from 'lodash';

import CI from './interface';
import { AXIS_HEIGHT_BASIC } from '../components/x-axis';

const PADDING_INNER = 0.2;
const PADDING_OUTER = 0.2;

class RectCoordinate extends CI {
  constructor(props) {
    super(props);

    const { x, y } = this.option;
    this.xAxis = this.scale(x, [0, this.width]);
    this.yAxis = this.scale(y, [this.height, 0]);
  }

  static axisHeight(option) {
    const axis = CI.getAxis(option.coordinate.x, option.children);
    return (axis.length || 1) * AXIS_HEIGHT_BASIC;
  }

  rect(idx) {

    const range = this.yAxis.scale.range();

    return {
      x: this.x(idx),
      y: range[1],
      width: this.bw(idx),
      height: range[0] - range[1]
    }
  }

  graphic(rect, d) {
    return {
      ...rect,
      y: this.yAxis.scale(d),
      height: this.yAxis.scale(0) - this.yAxis.scale(d)
    }
  }

  scale(d, range) {
    if (d.type === 'category') {
      return this.scaleBand(d, range)
    } else if (d.type === 'value') {
      return this.scaleLinear(d, range);
    }
  }

  scaleBand(d, range) {
    const ticks = CI.getTicks(d, this.children);
    const axis = CI.getAxis(d, this.children);
    const scale = d3.scaleBand()
      .domain(ticks.map((dd, i) => i))
      .range(range)
      .paddingInner(typeof(d.paddingInner) === 'number' ? d.paddingInner : PADDING_INNER)
      .paddingOuter(typeof(d.paddingOuter) === 'number' ? d.paddingOuter : PADDING_OUTER);

    return { scale, ticks, axis };
  }

  scaleLinear(d, range) {
    const scale = d3.scaleLinear()
      .domain([d.min, d.max])
      .range(range);

    return { scale };
  }

  idxToRoot(idx) {
    return CI.getTicks(this.option.x, this.children.slice(0, idx)).length
  }

  x(idx) {
    let r = idx;
    if (this.option.x.pickChildren) {
      r = this.idxToRoot(idx);
    }

    return this.xAxis.scale(r);
  }

  bw(idx) {
    let r = 1;
    let { pickChildren, paddingInner } = this.option.x;
    if (pickChildren) {
      const d = CI.getTicks(this.option.x, this.children.slice(idx, idx + 1));
      r = d.length;
    }

    paddingInner = typeof(paddingInner) === 'number' ? paddingInner : PADDING_INNER;

    const step = this.xAxis.scale.step();
    return step * r - step * paddingInner;
  }
}

export default RectCoordinate;