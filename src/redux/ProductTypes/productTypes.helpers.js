import { firestore } from './../../firebase/utils';

export const handleFetchProductTypes = () => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('productTypes')
			.get()
			.then(snapshot => {
				const productTypesArray = snapshot.docs.map(doc => {
					return {
						...doc.data(),
						documentID: doc.id
					};
				});
				resolve(productTypesArray);
			})
			.catch(err => {
				reject(err);
			});
	});
};
