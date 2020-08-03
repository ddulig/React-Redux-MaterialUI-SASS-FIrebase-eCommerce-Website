import userTypes from './users.types';

export const signInStart = userCredentials => ({
	type: userTypes.SIGN_IN_START,
	payload: userCredentials
});

export const signInSuccess = user => ({
	type: userTypes.SIGN_IN_SUCCESS,
	payload: user
});

export const checkUserSession = () => ({
	type: userTypes.CHECK_USER_SESSION
});

export const signOutUserStart = () => ({
	type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
	type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const setUserError = error => ({
	type: userTypes.USER_ERROR,
	payload: error
});

export const resetUserError = () => ({
	type: userTypes.RESET_USER_ERROR
});
