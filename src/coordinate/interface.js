class CoordinateInterface {
  constructor({ option, children, width, height }) {
    this.width = width;
    this.height = height;
    this.option = option;
    this.children = children;
  }

  static getTicks(d, children) {
    let domain = d.data;
    if (d.pickChildren && Array.isArray(children)) {
      domain = children.reduce((p, n, i) => {
        if (n.type === 'chart') {
          if (_.get(n, 'coordinate.x.pickChildren')) {
            p.push(...CoordinateInterface.getTicks(n.coordinate.x, n.children));
          } else {
            p.push(..._.get(n, 'coordinate.x.data', []))
          }
        } else {
          p.push(d.data[i]);
        }
        return p;
      }, []);
    }
    return domain;
  }

  static deepLength(data) {
    return data.reduce((p, n) => {
      if (typeof(n) === 'string') {
        return p + 1;
      } else {
        return p + CoordinateInterface.deepLength(n.children);
      }
    }, 0);
  }

  static toAxisMap(d, children) {
    const m = [];
    if (d.pickChildren && Array.isArray(children)) {
      d.data.map((k, i) => {
        const c = children[i];
        if (c && c.type === 'chart') {
          m.push({
            name: k,
            children: CoordinateInterface.toAxisMap(c.coordinate.x, c.children)
          });
        } else {
          m.push(k);
        }
      })
    } else {
      return d.data;
    }
    return m;
  }

  static toAxisData(data, arr, depth = 0, start = 0) {
    arr[depth] = arr[depth] || [];

    data.map(d => {
      const isString = typeof(d) === 'string';

      const name = isString ? d : d.name;
      const band = isString ? 1 : CoordinateInterface.deepLength(d.children);
      arr[depth].push({ name, band, start });

      if (!isString) {
        CoordinateInterface.toAxisData(d.children, arr, depth + 1, start);
      }
      start = start + band;
    });
  }

  static getAxis(d, children) {
    let axis = [];

    const dMap = CoordinateInterface.toAxisMap(d, children);

    CoordinateInterface.toAxisData(dMap, axis);

    return axis;
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