import * as d3 from 'd3';
import _ from 'lodash';

import CI from './interface';

class TreemapCoordinate extends CI {
  constructor(props) {
    super(props);

    const data = this.children.map(d => {
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
      .size([this.width, this.height])
      .padding(1);

    this.nodes = treemap(
      root.sum(function(d) { return d; })
    ).descendants().filter(d => !d.children);
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

export default TreemapCoordinate;