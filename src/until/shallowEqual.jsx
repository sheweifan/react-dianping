const shallowEqual = (obj, other) => {
  if (obj === other) {
    return true;
  }

  const objkeys = Object.keys(obj);
  const otherkeys = Object.keys(other);

  if (objkeys.length !== otherkeys.length) {
    return false;
  }

  let bool = true;

  objkeys.forEach((i) => {
    if (obj[i] !== other[i]) {
      bool = false;
    }
  });

  return bool;
};

export default shallowEqual;
