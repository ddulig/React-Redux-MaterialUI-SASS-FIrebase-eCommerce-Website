import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setPlantSizes } from './plantSizes.actions';
import { handleFetchPlantSizes } from './plantSizes.helpers';
import plantSizesTypes from './plantSizes.types';

export function* fetchPlantSizes() {
	try {
		const plantSizes = yield handleFetchPlantSizes();
		yield put(setPlantSizes(plantSizes));
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchPlantSizesStart() {
	yield takeLatest(plantSizesTypes.FETCH_PLANT_SIZES_START, fetchPlantSizes);
}

export default function* plantSizesSagas() {
	yield all([call(onFetchPlantSizesStart)]);
}
