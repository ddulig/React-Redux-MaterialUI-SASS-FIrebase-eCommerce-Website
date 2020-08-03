import { firestore } from './../../firebase/utils';

export const handleFetchPlantSizes = () => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('plantSizes')
			.get()
			.then(snapshot => {
				const plantSizesArray = snapshot.docs.map(doc => {
					return {
						...doc.data(),
						documentID: doc.id
					};
				});
				resolve(plantSizesArray);
			})
			.catch(err => {
				reject(err);
			});
	});
};
