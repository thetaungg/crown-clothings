import UserActionTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isFetching: false,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => { //setting default parameter //state is currentState

    switch (action.type) {
        case UserActionTypes.GOOGLE_SIGN_IN_START:
        case UserActionTypes.EMAIL_SIGN_IN_START:
        case UserActionTypes.SIGN_UP_START:
        case UserActionTypes.SIGN_OUT_START:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                isFetching: false,
                error: null
            };
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                isFetching: false,
                error: null
            };
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
        case UserActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            };
        default:
            return state;
    }

};

export default userReducer;