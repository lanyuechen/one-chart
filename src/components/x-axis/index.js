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
    const { scale, axis } = this.props;
    if (!axis) {
      this.axis.scale(scale);
      d3.select(this.refs.axis)
        .call(this.axis);
    }
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.scale !== this.props.scale) {
      return true;
    }
    return false;
  }

  render() {
    const { axis, scale } = this.props;

    if (axis) {
      const step = scale.step();
      const halfPaddingInner = scale.paddingInner() * step / 2;
      const range = scale.range();

      return (
        <g className="one-axis">
          {axis.map((d, i) => (
            <g key={i} transform={`translate(0, ${(axis.length - 1 - i) * AXIS_HEIGHT_BASIC})`}>

              <line x1={0} y1={0.5} x2={range[1]} y2={0.5} />

              {d.map((dd, j) => {
                if (j === 0) {
                  return null;
                }

                let x = scale(dd.start) - halfPaddingInner;

                return (
                  <line key={j} x1={x} y1={0} x2={x} y2={AXIS_HEIGHT_BASIC} />
                )
              })}
              {d.map((dd, j) => (
                <text
                  key={j}
                  x={scale(dd.start) + step * dd.band / 2 - halfPaddingInner}
                  y={14}
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