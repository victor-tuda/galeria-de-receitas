import { AUTH} from '../constants/actionTypes.js';
import * as api from '../api';

export const signIn = (formData, history) => async (dispatch) {
    try {
        // log in user..

        history.push('/');

    } catch (error) {
        console.log(error)
    }
}

export const signUp = (formData, history) => async (dispatch) {
    try {
        // sign up user..

        history.push('/');

    } catch (error) {
        console.log(error)
    }
}