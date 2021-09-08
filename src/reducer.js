import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import home from "./reducers/home";
import common from "./reducers/common";

const createReducers = (history) => combineReducers({
    router: connectRouter(history),
    home,
    common
})

export default createReducers;