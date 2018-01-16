import React, { Component } from 'react';

import { AXIS_HEIGHT_BASIC } from '../../../constant';

import './styles.scss';

class XAxis extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { axis, scale, offset } = this.props;

    const step = scale.step();
    const halfPaddingInner = scale.paddingInner() * step / 2;
    const axisWidth = scale.range()[1];
    const axisHeight = AXIS_HEIGHT_BASIC * axis.length;

    return (
      <g className="one-axis" transform={`translate(${offset[0]}, ${offset[1]})`}>

        <line x1={0.5} y1={0} x2={0.5} y2={axisHeight} /> {/* 表格左侧竖线 */}
        <line x1={axisWidth - 0.5} y1={0} x2={axisWidth - 0.5} y2={axisHeight} /> {/* 表格右侧竖线 */}
        <line x1={0.5} y1={axisHeight - 0.5} x2={axisWidth - 0.5} y2={axisHeight - 0.5} /> {/* 表格下方横线 */}

        {axis.map((d, i) => (
          <g key={i} transform={`translate(0, ${axisHeight - (i + 1) * AXIS_HEIGHT_BASIC})`}>

            <line x1={0} y1={0.5} x2={axisWidth} y2={0.5} />

            {d.map((dd, j) => {
              const x = scale(dd.start) - halfPaddingInner;
              return [
                (j > 0 && <line key={`l${j}`} x1={x} y1={0} x2={x} y2={AXIS_HEIGHT_BASIC} />),
                <text key={`t${j}`} x={x + step * dd.band / 2} y={14}>
                  {dd.name}
                </text>
              ];
            })}
          </g>
        ))}
      </g>
    )
  }
}

export default XAxis;