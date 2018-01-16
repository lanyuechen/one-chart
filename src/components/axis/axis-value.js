import React, { Component } from 'react';
import * as d3 from 'd3';

export default class AxisValue extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { scale, position } = this.props;
    this.axis = {
      left: d3.axisLeft,
      bottom: d3.axisBottom
    }[position](scale);
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