import React, { Component } from 'react';

import { AXIS_HEIGHT_BASIC } from './index';

import './styles.scss';

class XAxis extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.scale !== this.props.scale) {
      return true;
    }
    return false;
  }

  render() {
    const { axis, scale, offset } = this.props;

    const step = scale.step();
    const halfPaddingInner = scale.paddingInner() * step / 2;
    const range = scale.range();

    return (
      <g className="one-axis" transform={`translate(${offset[0]}, ${offset[1]})`}>

        <line x1={0.5} y1={0} x2={0.5} y2={AXIS_HEIGHT_BASIC * axis.length} />
        <line x1={range[1] - 0.5} y1={0} x2={range[1] - 0.5} y2={AXIS_HEIGHT_BASIC * axis.length} />
        <line x1={0.5} y1={AXIS_HEIGHT_BASIC * axis.length - 0.5} x2={range[1] - 0.5} y2={AXIS_HEIGHT_BASIC * axis.length - 0.5} />
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
}

export default XAxis;