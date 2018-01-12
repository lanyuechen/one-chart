class CoordinateInterface {
  constructor({ option, children, width, height }) {
    this.width = width;
    this.height = height;
    this.option = option;
    this.children = children;
  }

  static axisHeight(option) {
    return 0;
  }

  /**
   * 获取绘图区域
   * @param idx 区块索引
   * @returns {{x: 0, y: 0, width: 200, height: 100}}
   */
  rect(idx) {}

  /**
   * 绘图参数
   * @param rect
   * @param d
   */
  graphic(rect, d) {}
}

export default CoordinateInterface;