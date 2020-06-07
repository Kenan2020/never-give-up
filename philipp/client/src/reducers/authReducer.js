import { FETCH_USER, FETCH_FACEBOOK_USER } from '../actions/types';

export default function (state = null, action) {

    switch (action.type) {
        case FETCH_USER:
        case FETCH_FACEBOOK_USER:
            return action.payload || false;
        default:
            return state;
    }
}