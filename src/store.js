import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createReducers from './reducer';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { createLogger } from 'redux-logger';

export const history = createBrowserHistory();

const configureStore = () => {
  return createStore(
    createReducers(history),
    compose(
      composeWithDevTools(
        applyMiddleware(
          routerMiddleware(history),
          promiseMiddleware,
          localStorageMiddleware,
          createLogger()
        )
      )
    )
  );
};

export default configureStore;
