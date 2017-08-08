import obj2url from './obj2url';

const fetchData = (url, body) => fetch(url + obj2url(body))
  .then(res => res.json())
  .catch((e) => {
  });


export default fetchData;
