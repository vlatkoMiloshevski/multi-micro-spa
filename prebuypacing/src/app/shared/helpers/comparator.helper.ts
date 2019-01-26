export const ComparatorHelper = {
  int: (item1, item2, node1, node2, isInverted): number => {
    item1 = parseInt(item1, 10);
    item2 =  parseInt(item2, 10);
    if (isNaN(item1) && isNaN(item2)) {
      return 0;
    }
    if (isNaN(item1)) {
      return -1;
    }
    if (isNaN(item2)) {
      return 1;
    }
    return item1 - item2;
  },
  float: (item1, item2, node1, node2, isInverted): number => {
    item1 = parseFloat(item1);
    item2 =  parseFloat(item2);
    if (isNaN(item1) && isNaN(item2)) {
      return 0;
    }
    if (isNaN(item1)) {
      return -1;
    }
    if (isNaN(item2)) {
      return 1;
    }
    return item1 - item2;
  },
  date: (item1, item2, node1, node2, isInverted): number => {
    item1 = Date.parse(item1);
    item2 = Date.parse(item2);
    if (isNaN(item1) && isNaN(item2)) {
      return 0;
    }
    if (isNaN(item1)) {
      return -1;
    }
    if (isNaN(item2)) {
      return 1;
    }
    return item1 - item2;
  },
  intField: (field): Function => {
    return (item1, item2): number => {
      item1 = parseInt(item1 ? item1[field] : null, 10);
      item2 =  parseInt(item2 ? item2[field] : null, 10);
      if (isNaN(item1) && isNaN(item2)) {
        return 0;
      }
      if (isNaN(item1)) {
        return -1;
      }
      if (isNaN(item2)) {
        return 1;
      }
      return item1 - item2;
    }
  }
};
