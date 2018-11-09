import {
  CHANGE_SITE_CONTENT,CHANGE_SITE_MODULE,PAGE_NAME,GET_ALL_PAGE_NAME
} from "../actions/types";
import update from 'immutability-helper';

const initialState = {all:{
    En:[{type:"HeaderModule"},
      {type:"SidebarModule"}],
    Fa:[{type:"HeaderModule"},
      {type:"SidebarModule"}],
  bcolor:["","",]},
    pageName:"",
    id:"",
  pages:[]};
export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_SITE_CONTENT:
      return {...state,
        all:action.payload};
    case CHANGE_SITE_MODULE:
      return update(state, {
        all:{
            [action.index]: {$set: action.payload}}
        });
    case PAGE_NAME:
      return {...state,
        pageName:action.payload
      };
      case GET_ALL_PAGE_NAME:
        return {...state,
          pages:action.payload.pages
        };
    default:
      return state;
  }
}
