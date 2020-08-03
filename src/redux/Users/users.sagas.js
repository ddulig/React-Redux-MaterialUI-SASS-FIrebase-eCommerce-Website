import { takeLatest, call, all, put } from 'redux-saga/effects';
import {
	auth,
	handleUserProfile,
	getCurrentUser
} from './../../firebase/utils';
import userTypes from './users.types';
import {
	signInSuccess,
	signOutUserSuccess,
	setUserError
} from './users.actions';

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
	try {
		const userRef = yield call(handleUserProfile, {
			userAuth: user,
			additionalData
		});
		const snapshot = yield userRef.get();
		yield put(
			signInSuccess({
				id: snapshot.id,
				...snapshot.data()
			})
		);
	} catch (err) {
		yield put(setUserError(err));
	}
}

export function* signIn({ payload: { email, password } }) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user);
	} catch (err) {
		yield put(setUserError(err));
	}
}

export function* onSignInStart() {
	yield takeLatest(userTypes.SIGN_IN_START, signIn);
}

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUser();
		if (!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth);
	} catch (err) {
		yield put(setUserError(err));
	}
}

export function* onCheckUserSession() {
	yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
	try {
		yield auth.signOut();
		yield put(signOutUserSuccess());
	} catch (err) {
		yield put(setUserError(err));
	}
}

export function* onSignOutUserStart() {
	yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export default function* userSagas() {
	yield all([
		call(onSignInStart),
		call(onCheckUserSession),
		call(onSignOutUserStart)
	]);
}
