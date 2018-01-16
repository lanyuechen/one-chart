import React, { Component } from 'react';
import AxisValue from './axis-value';
import AxisBand from './axis-band';

export default class Axis extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { type } = this.props;
    if (type === 'value') {
      return (
        <AxisValue {...this.props} />
      )
    }
    return (
      <AxisBand {...this.props} />
    );
  }
}