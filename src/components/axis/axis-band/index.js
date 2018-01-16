import React, { Component } from 'react';

import AxisD3 from './axis-d3';
import AxisTable from './axis-table';

export default class AxisBand extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { axis } = this.props;

    return axis ? (
      <AxisTable {...this.props} />
    ) : (
      <AxisD3 {...this.props} />
    );
  }
}