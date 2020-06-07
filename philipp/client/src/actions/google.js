import api from '../utils/api'
import { FETCH_USER } from './types';
import setAuthToken from '../utils/setAuthToken'

export const fetchUser = () => async dispatch => {
    const res = await api.get('/current_user');

    setAuthToken(res.data.token)

    dispatch({ type: FETCH_USER, payload: res.data });
};