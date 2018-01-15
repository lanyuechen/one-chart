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

  static getTicks(d, children) {
    let domain = d.data;
    if (d.pickChildren && Array.isArray(children)) {
      domain = children.reduce((p, n, i) => {
        if (n.type === 'chart') {
          if (_.get(n, 'coordinate.x.pickChildren')) {
            p.push(...RectCoordinate.getTicks(n.coordinate.x, n.children));
          } else {
            p.push(..._.get(n, 'coordinate.x.data', []))
          }
        } else {
          p.push(d.data[i]);
        }
        return p;
      }, []);
    }
    return domain;
  }

  static deepLength(data) {
    return data.reduce((p, n) => {
      if (typeof(n) === 'string') {
        return p + 1;
      } else {
        return p + RectCoordinate.deepLength(n.children);
      }
    }, 0);
  }

  static toAxisMap(d, children) {
    const m = [];
    if (d.pickChildren && Array.isArray(children)) {
      d.data.map((k, i) => {
        const c = children[i];
        if (c && c.type === 'chart') {
          m.push({
            name: k,
            children: RectCoordinate.toAxisMap(c.coordinate.x, c.children)
          });
        } else {
          m.push(k);
        }
      })
    } else {
      return d.data;
    }
    return m;
  }

  static toAxisData(data, arr, depth = 0, start = 0) {
    arr[depth] = arr[depth] || [];

    data.map(d => {
      const isString = typeof(d) === 'string';

      const name = isString ? d : d.name;
      const band = isString ? 1 : RectCoordinate.deepLength(d.children);
      arr[depth].push({ name, band, start });

      if (!isString) {
        RectCoordinate.toAxisData(d.children, arr, depth + 1, start);
      }
      start = start + band;
    });
  }

  static getAxis(d, children) {
    let axis = [];

    const dMap = RectCoordinate.toAxisMap(d, children);

    RectCoordinate.toAxisData(dMap, axis);

    return axis;
  }

  static axisHeight(option) {
    const axis = RectCoordinate.getAxis(option.coordinate.x, option.children);
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
      type: 'rect',
      feature: {
        x: 0,
        y: this.yAxis.scale(d),
        width: rect.width,
        height: this.yAxis.scale(0) - this.yAxis.scale(d)
      }
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
    const ticks = RectCoordinate.getTicks(d, this.children);
    const axis = RectCoordinate.getAxis(d, this.children);
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
    return RectCoordinate.getTicks(this.option.x, this.children.slice(0, idx)).length
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
      const d = RectCoordinate.getTicks(this.option.x, this.children.slice(idx, idx + 1));
      r = d.length;
    }

    paddingInner = typeof(paddingInner) === 'number' ? paddingInner : PADDING_INNER;

    const step = this.xAxis.scale.step();
    return step * r - step * paddingInner;
  }
}

export default RectCoordinate;