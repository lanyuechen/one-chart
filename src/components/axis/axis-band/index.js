import React, { Component } from 'react';

import AxisFromD3 from './axis-from-d3';
import AxisTable from './axis-table';

class XAxis extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { axis } = this.props;

    return axis ? (
      <AxisTable {...this.props} />
    ) : (
      <AxisFromD3 {...this.props} />
    );
  }
}

export default XAxis;