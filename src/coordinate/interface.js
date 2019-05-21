class CoordinateInterface {
  constructor({ option, children, width, height }) {
    this.width = width;
    this.height = height;
    this.option = option;
    this.children = children;
  }

  static valueOf(v, n = 0, idx) {
    if (typeof(v) === 'number') {
      v = [idx, v];
    }
    if (Array.isArray(v)) {
      return v[n];
    }
    return idx;
  }

  /**
   * 获取绘图区域
   * @param idx 区块索引
   * @param d 数值
   * @returns {{x: 0, y: 0, width: 200, height: 100}}
   */
  rect(idx, d) {}

  /**
   * 绘图参数
   * @param rect
   * @param d
   */
  graphic(rect, d) {}
}

export default CoordinateInterface;