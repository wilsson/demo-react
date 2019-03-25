import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
// action type
export const INCREMENT = 'INCREMENT';

// reducer
const counter = (count = 0, action) => {
    switch (action.type) {
        case INCREMENT: {
            return count + 1;
        }
        default:
            return count;
    }
}


// action type

export const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
export const FETCH_LIST_SUCESS = 'FETCH_LIST_SUCESS';
export const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';

// reducer
const initialState = {
    data: [],
    error: false,
    isFetching: false
};

const list = (list = initialState, action) => {
    switch (action.type) {
        case FETCH_LIST_REQUEST: {
            return {
                ...initialState,
                isFetching: true
            };
        }
        case FETCH_LIST_SUCESS: {
            return {
                ...initialState,
                isFetching: false,
                data: action.data
            };
        }
        case FETCH_LIST_FAILURE: {
            return {
                ...initialState,
                error: true,
                isFetching: false
            };
        }
        default:
            return list;
    }
};

// actions
export const fetchList = () => {
    return async dispatch => {
        dispatch({ type: FETCH_LIST_REQUEST });
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos');
            console.log(data);
            dispatch({ type: FETCH_LIST_SUCESS, data });
        } catch (e) {
            dispatch({ type: FETCH_LIST_FAILURE });
        }
    }
}

// store
export const store = createStore(list, applyMiddleware(
    thunk
));
