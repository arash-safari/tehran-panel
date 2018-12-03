import {
    CHANGE_SITE_CONTENT, CHANGE_SITE_MODULE, PAGE_NAME, GET_ALL_PAGE_NAME, GET_PAGE_BY_ID
} from "../actions/types";
import update from 'immutability-helper';

const initialState = {
    all: {
        En: [{type: "HeaderModule"},
            {type: "SidebarModule"}],
        Fa: [{type: "HeaderModule"},
            {type: "SidebarModule"}],
        bcolor: ["", "",]
    },
    pageName: "",
    id: "",
    pages: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case CHANGE_SITE_CONTENT:
            return {
                ...state,
                all: action.payload
            };
        case CHANGE_SITE_MODULE:
            return update(state, {
                all: {
                    [action.index]: {$set: action.payload}
                }
            });
        case PAGE_NAME:
            return {
                ...state,
                pageName: action.payload
            };
        case GET_ALL_PAGE_NAME:
            return {
                ...state,
                pages: action.payload.pages
            };
        case GET_PAGE_BY_ID:
            return {
                ...state,
                all: action.payload.data,
                pageName:action.payload.pageName,
                id: action.payload.id,
            };
        default:
            return state;
    }
}
