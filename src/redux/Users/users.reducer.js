import userTypes from './users.types';

const INITIAL_STATE = {
	currentUser: null,
	userError: null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case userTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				currentUser: action.payload
			};
		case userTypes.SIGN_OUT_USER_SUCCESS:
			return {
				...state,
				...INITIAL_STATE
			};
		case userTypes.USER_ERROR:
			return {
				...state,
				userError: action.payload
			};
		case userTypes.RESET_USER_ERROR:
			return {
				...state,
				userError: null
			};
		default:
			return state;
	}
};

export default userReducer;
