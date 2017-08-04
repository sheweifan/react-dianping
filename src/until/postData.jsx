// import {fetchUrl} from '../config/index';
import obj2url from './obj2url';

const postData = (url, body) =>
  // console.log(url,obj2url(body))
	 fetch(url, {
    method: 'POST',
    body: obj2url(body),
  })
    .then(res => res.json());


export default postData;
