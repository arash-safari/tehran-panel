import {
  CHANGE_SITE_CONTENT, CHANGE_SITE_MODULE, PAGE_NAME
} from "./types";

export const changeSiteContent = (siteContent,func=()=>{})=> {
  return dispatch => {
    dispatch({type: CHANGE_SITE_CONTENT, payload:siteContent});
  }
};
export const changeSiteModule = (moduleContent,index)=>{
  return dispatch => {
    dispatch({type: CHANGE_SITE_MODULE, payload:moduleContent, index:index});
  }
};

export const setPageName = (pageName)=>{
  return dispatch=>{
    dispatch({type: PAGE_NAME, payload:pageName});
  }
};
