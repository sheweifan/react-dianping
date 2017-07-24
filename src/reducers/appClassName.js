import { APPCLASSNAME_UPDATE } from '../actions/appClassName';


export default function appClassName(state = 'has_head', action) {
  switch (action.type) {
    case APPCLASSNAME_UPDATE:
      return action.appClassName;
    default:
      return state;
  }
}

