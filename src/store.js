import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createReducers  from './reducer';
import { promiseMiddleware, localStorageMiddleware } from './middleware';

export const history = createBrowserHistory();

const configureStore = (preloadedState) => {
    return createStore(
        createReducers(history),
        preloadedState,
        compose(
            composeWithDevTools(
                applyMiddleware(
                routerMiddleware(history),
                promiseMiddleware,
                localStorageMiddleware
                )
            )
        )
    )
}

export default configureStore;