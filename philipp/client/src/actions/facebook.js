import api from '../utils/api'
import { FETCH_FACEBOOK_USER } from './types';
import setAuthToken from '../utils/setAuthToken'

export const fetchFacebookUser = () => async dispatch => {
    const res = await api.get('/current_facebook_user');
    console.log(res.data)
    setAuthToken(res.data.token)

    dispatch({ type: FETCH_FACEBOOK_USER, payload: res.data });
};