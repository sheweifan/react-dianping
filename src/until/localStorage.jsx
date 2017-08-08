
const __DEV__ = window.__DEV__;

export const getItem = (key) => {
  let value;
  try {
    value = window.localStorage.getItem(key);
  } catch (e) {
    if (__DEV__) {
      throw new Error('浏览器不支持localStorage!');
    }
  }
  return value;
};

export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    if (__DEV__) {
      throw new Error('浏览器不支持localStorage!');
    }
  }
};

export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    if (__DEV__) {
      throw new Error('浏览器不支持localStorage!');
    }
  }
};
