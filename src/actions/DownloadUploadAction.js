import {
    UPLOAD_DATA, GET_ALL_PAGE_NAME,GET_PAGE_BY_ID
} from "./types";
import {href} from "../const";

export const uploadData = (data, func) => {
    console.log(data);
    return dispatch => {
        if (data.id === "") {
            fetch(href+'/pages/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pageName: data.pageName,
                    data: data.all,
                })
            })
                .then(res => res.json())
                .then(con => {
                    dispatch({type: UPLOAD_DATA, payload: con})
                }).then(func())
        }
        else {
            fetch(href+'/pages/', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pageName: data.pageName,
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
export const getAllPageName = (name, func) => {
    return dispatch => {
        fetch(href+'/pages/page-names/' + name)
            .then(res => res.json())
            .then(res => {
                dispatch({type: GET_ALL_PAGE_NAME, payload: res})
                return res;
            }).then(res => func(res))
    }
};
export const getPageById = (id, func) => {
    return dispatch => {
        fetch(href+'/pages/' + id)
            .then(res => res.json())
            .then(res => {
                dispatch({type: GET_PAGE_BY_ID, payload: res})
                return res;
            }).then(res => func(res))
    }
};