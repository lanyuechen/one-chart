import React, { Component } from 'react';
import * as d3 from 'd3';

class XAxis extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { ticks, scale } = this.props;
    this.axis = d3.axisBottom(scale)
      .tickFormat((d, i) => {
        return ticks[i];
      });
    d3.select(this.refs.axis)
      .call(this.axis);
  }

  componentDidUpdate() {
    this.updateAxis();
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.scale !== this.props.scale) {
      return true;
    }
    return false;
  }

  updateAxis = () => {
    const { scale } = this.props;
    this.axis.scale(scale);
    d3.select(this.refs.axis)
      .call(this.axis);
  };

  render() {
    const { offset } = this.props;

    return (
      <g ref="axis" transform={`translate(${offset[0]}, ${offset[1]})`} />
    )
  }
}

export default XAxis;