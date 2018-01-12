import CalendarCoordinate from './index';

import option from '../../../example/option';

describe('CalendarCoordinate', () => {
  it('uuid', () => {
    new CalendarCoordinate({
      option: option.calendar.coordinate,
      children: option.calendar.children,
      width: 600,
      height: 400
    })
  });
});