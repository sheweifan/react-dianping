import { USERINFO_UPDATE } from '../actions/userInfo';


export default function userInfo(state = {}, action) {
  switch (action.type) {
    case USERINFO_UPDATE:
      return action.userinfo;
    default:
      return state;
  }
}

