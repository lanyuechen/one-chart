import React, { Component } from 'react';
import * as d3 from 'd3';

class YAxis extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { scale } = this.props;
    this.axis = d3.axisLeft(scale);
    d3.select(this.refs.axis)
      .call(this.axis);
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
    const { offset } = this.props;
    return (
      <g ref="axis" transform={`translate(${offset[0]}, ${offset[1]})`}>

      </g>
    )
  }
}

export default YAxis;