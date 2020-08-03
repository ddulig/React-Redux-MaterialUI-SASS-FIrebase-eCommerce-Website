import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setContainerSizes } from './containerSizes.actions';
import { handleFetchContainerSizes } from './containerSizes.helpers';
import containerSizesTypes from './containerSizes.types';

export function* fetchContainerSizes() {
	try {
		const containerSizes = yield handleFetchContainerSizes();
		yield put(setContainerSizes(containerSizes));
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchContainerSizesStart() {
	yield takeLatest(
		containerSizesTypes.FETCH_CONTAINER_SIZES_START,
		fetchContainerSizes
	);
}

export default function* containerSizesSagas() {
	yield all([call(onFetchContainerSizesStart)]);
}
