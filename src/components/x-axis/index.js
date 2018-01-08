import React, { Component } from 'react';
import * as d3 from 'd3';

import './styles.scss';

export const AXIS_HEIGHT_BASIC = 20;

class XAxis extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { ticks, scale, axis } = this.props;
    if (!axis) {
      this.axis = d3.axisBottom(scale)
        .tickFormat((d, i) => {
          return ticks[i];
        });
      d3.select(this.refs.axis)
        .call(this.axis);
    }
  }

  componentDidUpdate() {
    this.updateAxis();
  }

  updateAxis = () => {
    const { scale } = this.props;
    this.axis.scale(scale);
    d3.select(this.refs.axis)
      .call(this.axis);
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.scale !== this.props.scale) {
      return true;
    }
    return false;
  }

  render() {
    const { axis, scale } = this.props;

    console.log('*****', axis);

    if (axis) {
      const paddingInner = scale.paddingInner();
      const step = scale.step();

      return (
        <g className="one-axis">
          {axis.map((d, i) => (
            <g key={i} transform={`translate(0, ${(axis.length - 1 - i) * AXIS_HEIGHT_BASIC + 16})`}>
              {d.map((dd, j) => (
                <text
                  key={j}
                  x={scale(dd.start) + (step * dd.band - step * paddingInner) / 2}
                >
                  {dd.name}
                </text>
              ))}
            </g>
          ))}
        </g>
      )
    }

    return (
      <g ref="axis">

      </g>
    )
  }
}

export default XAxis;