import {
  UPLOAD_DATA,GET_ALL_PAGE_NAME
} from "./types";

export const uploadData = (data, func) => {

  return dispatch => {
    if(data.id===""){
      fetch('http://localhost:3023/api/pages/', {
         method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageName:data.pageName,
          data: data.all,
        })
      })
        .then(res => res.json())
        .then(con => {
          dispatch({type: UPLOAD_DATA, payload: con})
        }).then(func())
    }
    else{
        fetch('http://localhost:3023/api/pages/', {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageName:data.pageName,
            data: data.all,
            id: data.id,
          })
        })
          .then(res => res.json())
          .then(con => {
            dispatch({type: UPLOAD_DATA, payload: con})
          }).then(func())
    }
  }
};
export const getAllPageName =(func)=>{
  return dispatch => {
    fetch('http://localhost:3023/api/pages/page-names')
      .then(res => res.json())
      .then(con => {
        dispatch({type: GET_ALL_PAGE_NAME, payload: con})
      }).then(func())
  }
};
