// import {fetchUrl} from '../config/index';
import obj2url from './obj2url';

const fetchData = (url, body) =>
  // console.log(url,obj2url(body))
	 fetch(url + obj2url(body))
    .then(res => res.json())
    .catch((e) => {
      // console.log(e);
      // window.reload();
    });


export default fetchData;
