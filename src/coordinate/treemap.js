import * as d3 from 'd3';
import _ from 'lodash';

class Coordinate {
  constructor({ option, children, width, height }) {
    this.width = width;
    this.height = height;
    this.option = option;
    this.children = children;

    const data = children.map(d => {
      if (!d) {
        return 0;
      }
      if (typeof(d) === 'number') {
        return d;
      }
      return d.value || 0;
    });

    const root = d3.hierarchy({ children: data });
    const treemap = d3.treemap()
      .size([width, height])
      .padding(1);

    this.nodes = treemap(
      root.sum(function(d) { return d; })
        .sort(function(a, b) { return b.height - a.height || b.value - a.value;})
    ).descendants().filter(d => !d.children);
  }

  static axisHeight(option) {
    return 0;
  }

  rect(idx) {

    const node = this.nodes[idx];

    return {
      x: node.x0,
      y: node.y0,
      width: node.x1 - node.x0,
      height: node.y1 - node.y0
    }
  }

  graphic(rect, d) {
    return rect;
  }
}

export default Coordinate;