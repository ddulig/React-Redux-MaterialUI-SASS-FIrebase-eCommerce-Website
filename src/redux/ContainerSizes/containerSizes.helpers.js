import { firestore } from './../../firebase/utils';

export const handleFetchContainerSizes = () => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('containerSizes')
			.get()
			.then(snapshot => {
				const containerSizesArray = snapshot.docs.map(doc => {
					return {
						...doc.data(),
						documentID: doc.id
					};
				});
				resolve(containerSizesArray);
			})
			.catch(err => {
				reject(err);
			});
	});
};
