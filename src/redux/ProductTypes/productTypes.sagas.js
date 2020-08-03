import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProductTypes } from './productTypes.actions';
import { handleFetchProductTypes } from './productTypes.helpers';
import productTypesTypes from './productTypes.types';

export function* fetchProductTypes() {
	try {
		const productTypes = yield handleFetchProductTypes();
		yield put(setProductTypes(productTypes));
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchProductTypesStart() {
	yield takeLatest(
		productTypesTypes.FETCH_PRODUCT_TYPES_START,
		fetchProductTypes
	);
}

export default function* productTypesSagas() {
	yield all([call(onFetchProductTypesStart)]);
}
