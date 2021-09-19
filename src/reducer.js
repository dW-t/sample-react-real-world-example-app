import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import home from './reducers/home';
import common from './reducers/common';
import articleList from './reducers/articleList';
import auth from './reducers/auth';

const createReducers = (history) =>
  combineReducers({
    router: connectRouter(history),
    home,
    common,
    articleList,
    auth,
  });

export default createReducers;
