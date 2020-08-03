import { auth } from './../../firebase/utils';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import {
	setProducts,
	fetchProductsStart,
	fetchProductStart,
	setProduct,
	setProductError
} from './products.actions';
import {
	handleFetchProducts,
	handleAddProduct,
	handleDeleteProduct,
	handleEditProduct,
	handleFetchProduct
} from './products.helpers';
import productsTypes from './products.types';

export function* fetchProducts() {
	try {
		const products = yield handleFetchProducts();
		yield put(setProducts(products));
	} catch (err) {
		yield put(setProductError(`FETCH PRODUCTS ERROR: ${err}`));
	}
}

export function* onFetchProductsStart() {
	yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts);
}

export function* fetchProduct({ payload }) {
	try {
		const product = yield handleFetchProduct(payload);
		yield put(setProduct(product));
	} catch (err) {
		yield put(setProductError(`FETCH PRODUCT ERROR: ${err}`));
	}
}

export function* onFetchProductStart() {
	yield takeLatest(productsTypes.FETCH_PRODUCT_START, fetchProduct);
}

export function* addProduct({
	payload: {
		name,
		description,
		price,
		quantity,
		productType,
		featured,
		containerSize,
		growingCondition,
		plantSize,
		imageSrc
	}
}) {
	try {
		const timestamp = new Date();
		let productDetails = {
			name,
			description,
			price,
			quantity,
			productType,
			featured,
			imageSrc,
			createdBy: auth.currentUser.uid,
			createdDate: timestamp
		};

		if (containerSize !== '')
			productDetails = {
				containerSize,
				...productDetails
			};

		if (growingCondition !== '')
			productDetails = {
				growingCondition,
				...productDetails
			};

		if (plantSize !== '')
			productDetails = {
				plantSize,
				...productDetails
			};

		yield handleAddProduct(productDetails);
		yield put(fetchProductsStart());
	} catch (err) {
		yield put(setProductError(`ADD PRODUCT ERROR: ${err}`));
	}
}

export function* onAddProductStart() {
	yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct);
}

export function* deleteProduct({ payload: { documentID, storageUri }, page }) {
	try {
		const productDetails = { documentID, storageUri };
		yield handleDeleteProduct(productDetails);

		if (page === 'Manage') yield put(fetchProductsStart());
	} catch (err) {
		yield put(setProductError(`DELETE PRODUCT ERROR: ${err}`));
	}
}

export function* onDeleteProductStart() {
	yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct);
}

export function* editProduct({
	payload: {
		documentID,
		details: {
			name,
			description,
			price,
			quantity,
			productType,
			featured,
			containerSize,
			growingCondition,
			plantSize,
			imageSrc,
			storageUri
		}
	},
	page
}) {
	try {
		const timestamp = new Date();
		const productDetails = {
			name,
			description,
			price,
			quantity,
			productType,
			growingCondition,
			containerSize,
			plantSize,
			featured,
			updatedBy: auth.currentUser.uid,
			lastUpdatedDate: timestamp
		};
		const imageDetails = {
			imageSrc,
			storageUri
		};
		console.log(productDetails);
		yield handleEditProduct(documentID, productDetails, imageDetails);

		if (page === 'Manage') yield put(fetchProductsStart());
		else if (page === 'View') yield put(fetchProductStart(documentID));
	} catch (err) {
		yield put(setProductError(`EDIT PRODUCT ERROR: ${err}`));
	}
}

export function* onEditProductStart() {
	yield takeLatest(productsTypes.EDIT_PRODUCT_START, editProduct);
}

export default function* productsSagas() {
	yield all([
		call(onFetchProductsStart),
		call(onFetchProductStart),
		call(onAddProductStart),
		call(onDeleteProductStart),
		call(onEditProductStart)
	]);
}
