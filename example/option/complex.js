import bar1 from './bar1.json';
import bar2 from './bar2.json';
import bar3 from './bar3.json';

export default {
  "type": "chart",
  "coordinate": {
    "type": "treemap",
    "data": [10, 20, 50]
  },
  "brush": {},
  "children": [
    bar1,
    bar2,
    bar3
  ]
}