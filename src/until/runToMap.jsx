// RL: http://m.amap.com/navi/?dest=113.32349,23.142785&destName=耀中广场&hideRouteIcon=1&key=5e9e81df29c6bdc9ee1c2217d85054a7

const mapUrl = 'http://m.amap.com/navi/?';
const mapKey = '5e9e81df29c6bdc9ee1c2217d85054a7';

const runToMap = (x, y, name) => {
  // console.log(`dest=${x},${y}&destName=${name}&hideRouteIcon=1&key=${mapKey}`);
  window.open(`${mapUrl}dest=${x},${y}&destName=${name}&hideRouteIcon=1&key=${mapKey}`);
};

export default runToMap;
