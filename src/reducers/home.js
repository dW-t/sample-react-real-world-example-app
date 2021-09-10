import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../constants/actionType';

const home = (state = {}, action) => {
    switch (action.type) {
        case HOME_PAGE_LOADED:
            return {
                ...state,
                tags: action.payload[0]
            };
        case HOME_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};

export default home;