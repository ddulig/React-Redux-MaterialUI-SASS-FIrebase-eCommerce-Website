import { firestore, storage } from './../../firebase/utils';

export const handleFetchProducts = () => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.orderBy('name')
			.get()
			.then(snapshot => {
				const productsArray = snapshot.docs.map(doc => {
					return {
						...doc.data(),
						documentID: doc.id
					};
				});
				resolve(productsArray);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const handleFetchProduct = documentID => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc(documentID)
			.get()
			.then(prodData => {
				let product = {
					...prodData.data(),
					documentID: prodData.id
				};

				firestore
					.collection('productTypes')
					.doc(product.productType)
					.get()
					.then(prodTypeData => {
						const productTypeVal = prodTypeData.data().type;

						product = {
							...product,
							productTypeVal
						};

						if (productTypeVal === 'Plant' || productTypeVal === 'Pot') {
							firestore
								.collection('containerSizes')
								.doc(product.containerSize)
								.get()
								.then(csData => {
									product = {
										...product,
										containerSizeVal: csData.data().size
									};

									if (productTypeVal === 'Plant') {
										firestore
											.collection('plantSizes')
											.doc(product.plantSize)
											.get()
											.then(plantSizeData => {
												product = {
													...product,
													plantSizeVal: plantSizeData.data().size
												};

												firestore
													.collection('growingConditions')
													.doc(product.growingCondition)
													.get()
													.then(growingConditionData => {
														product = {
															...product,
															growingConditionVal: growingConditionData.data().condition
														};

														resolve(product);
													});
											});
									} else {
										resolve(product);
									}
								});
						} else {
							resolve(product);
						}
					});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const handleAddProduct = product => {
	return new Promise((resolve, reject) => {
		const { imageSrc } = product;

		if (product)
			firestore
				.collection('products')
				.add({ ...product, imageSrc: '' })
				.then(productRef => {
					let filePath = `Products/${productRef.id}/${imageSrc.name}`;
					storage
						.ref(filePath)
						.put(imageSrc)
						.then(fileSnapshot => {
							fileSnapshot.ref.getDownloadURL().then(url => {
								productRef
									.update({
										imageSrc: url,
										storageUri: fileSnapshot.metadata.fullPath
									})
									.then(() => {
										resolve();
									});
							});
						});
				})
				.catch(err => {
					reject(err);
				});
	});
};

export const handleDeleteProduct = product => {
	return new Promise((resolve, reject) => {
		const { documentID, storageUri } = product;

		firestore
			.collection('products')
			.doc(documentID)
			.delete()
			.then(() => {
				storage
					.ref(storageUri)
					.delete()
					.then(() => {
						resolve();
					});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const handleEditProduct = (documentID, productDetails, imageDetails) => {
	return new Promise((resolve, reject) => {
		firestore
			.collection('products')
			.doc(documentID)
			.update({ ...productDetails })
			.then(() => {
				const { imageSrc, storageUri } = imageDetails;

				if (typeof imageSrc !== 'string') {
					storage
						.ref(storageUri)
						.delete()
						.then(() => {
							const productRef = firestore.collection('products').doc(documentID);
							const filePath = `Products/${productRef.id}/${imageSrc.name}`;

							storage
								.ref(filePath)
								.put(imageSrc)
								.then(fileSnapshot => {
									fileSnapshot.ref.getDownloadURL().then(url => {
										productRef
											.update({
												imageSrc: url,
												storageUri: fileSnapshot.metadata.fullPath
											})
											.then(() => {
												resolve();
											});
									});
								});
						});
				} else {
					//image not updated
					resolve();
				}
			})
			.catch(err => {
				reject(err);
			});
	});
};
