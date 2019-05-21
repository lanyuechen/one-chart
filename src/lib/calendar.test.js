import Calendar from './calendar';

describe('calendar', () => {
  it('solar2lunar', () => {
    const a = Calendar.solar2lunar(2018, 1, 22);
    console.log('================>', a)
  });
});