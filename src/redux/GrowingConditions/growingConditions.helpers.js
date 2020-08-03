import { firestore } from './../../firebase/utils';

export const handleFetchGrowingConditions = () => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('growingConditions')
			.get()
			.then(snapshot => {
				const growingConditionsArray = snapshot.docs.map(doc => {
					return {
						...doc.data(),
						documentID: doc.id
					};
				});
				resolve(growingConditionsArray);
			})
			.catch(err => {
				reject(err);
			});
	});
};
