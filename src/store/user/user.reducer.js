//using Reducer instead of useState
import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
};

//give state inside the function a default value i.e INITIAL_STATE
//checking to make sure our users are going in or error going in
export const userReducer = (state = INITIAL_STATE , action) => {
    const {type, payload} = action;

    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            };
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
            return {
                ...state,
                error: payload
            };
        default:
            return state;
    }
};