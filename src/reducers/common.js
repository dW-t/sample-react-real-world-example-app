import { APP_LOAD, HOME_PAGE_UNLOADED } from '../constants/actionType';

const defaultState = {
  appName: 'Conduit',
  token: null,
  viewChangeCounter: 0,
};

const common = (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null,
      };
    case HOME_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};

export default common;
