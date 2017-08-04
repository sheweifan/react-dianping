export const getItem = (key) => {
  let value = void '';
  try {
    value = window.localStorage.getItem(key);
  } catch (e) {
    if (__DEV__) {
      console.log('浏览器不支持localStorage', e);
    }
  } finally {
    return value;
  }
};
export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    if (__DEV__) {
      console.log('浏览器不支持localStorage', e);
    }
  }
};
export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    if (__DEV__) {
      console.log('浏览器不支持localStorage', e);
    }
  }
};
