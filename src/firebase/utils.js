import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storage = firebase.storage();

export const handleUserProfile = async ({ userAuth, additionalData }) => {
	if (!userAuth) return;
	const { uid } = userAuth;

	const userRef = firestore.doc(`users/${uid}`);
	//const snapshot = await userRef.get();

	// //adding the new user
	// if (!snapshot.exists) {
	// 	const { displayName, email } = userAuth;
	// 	const timestamp = new Date();
	// 	const userRoles = ['user'];

	// 	try {
	// 		await userRef.set({
	// 			displayName,
	// 			email,
	// 			createdDate: timestamp,
	// 			userRoles,
	// 			...additionalData
	// 		});
	// 	} catch (err) {
	// 		// console.log(err);
	// 	}
	// }

	return userRef;
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged(userAuth => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};
