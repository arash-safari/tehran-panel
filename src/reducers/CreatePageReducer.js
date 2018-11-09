import update from 'immutability-helper';
import {
  ADD_PART,
  DELETE_Module,
  ADD_POST,
  ADD_ONE_SECTION,
  ADD_PEOPLE,
  ADD_TWO_SECTION_BIG,
  ADD_TWO_SECTION,
} from "../actions/types";
import {getRandomColor} from "../module/Color";

const initialState = [];
export default function (state = initialState, action) {
  if(action.index<0)
    return update(state,{[action.index]:{$set: [action.payload]}});
  switch (action.type) {
    case ADD_PART:
      return update(state,{$push: [{key:state.modules?""+state.modules.length:
              "0",type:"PartModule",title:"partmodule",bcolor:getRandomColor()}]});
    case ADD_POST:
      return update(state,{$push: [{key:state.modules?""+state.modules.length:
            "0",type:"PostModule",postType:"String",title:"PostType",content:"content",subtitle:"subtitle",bcolor:getRandomColor()}]});
    case ADD_PEOPLE:
      return update(state,{$push: [{key:state.modules?""+state.modules.length:
            "0",type:"PeopleModule",postType:"String",title:"PostType",content:"content",subtitle:"subtitle",bcolor:getRandomColor()}]});
    case ADD_ONE_SECTION:
      return update(state,{$push: [{key:state.modules?""+state.modules.length:
            "0",type:"OneSectionModule",postType:"String",title:"PostType",content:"content",subtitle:"subtitle",bcolor:getRandomColor()}]});
    case ADD_TWO_SECTION_BIG:
      return update(state,{$push: [{key:state.modules?""+state.modules.length:
            "0",type:"TwoSectionBigModule",postType:"String",title:"PostType",content:"content",subtitle:"subtitle",bcolor:getRandomColor()}]});
    case ADD_TWO_SECTION:
      return update(state,{$push: [{key:state.modules?""+state.modules.length:
            "0",type:"TwoSectionModule",postType:"String",title:"PostType",content:"content",subtitle:"subtitle",bcolor:getRandomColor()}]});
    case DELETE_Module:
      return update(state,{$remove: [action.index]});
    default :
      return state;
  }
}
