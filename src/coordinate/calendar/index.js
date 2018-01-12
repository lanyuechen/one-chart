import CI from '../interface';

class CalendarCoordinate extends CI {
  constructor(props) {
    super(props);

    const { date } = this.option;
    const dateArr = date.split('-');
    const start = new Date(dateArr[0], dateArr[1] - 1);
    const end = new Date(dateArr[0], dateArr[1], 0);

    this.startIdx = start.getDay();
    this.gridWidth = this.width / 7;
    this.gridHeight = this.height / Math.ceil((end.getDate() + this.startIdx) / 7);
  }

  rect(idx) {
    idx = this.startIdx + idx;
    return {
      x: idx % 7 * this.gridWidth + 1,
      y: Math.floor(idx / 7) * this.gridHeight + 1,
      width: this.gridWidth - 2,
      height: this.gridHeight - 2
    }
  }

  graphic(rect, d) {
    return {
      ...rect,
      x: 0,
      y: 0
    };
  }

}

export default CalendarCoordinate;