import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setGrowingConditions } from './growingConditions.actions';
import { handleFetchGrowingConditions } from './growingConditions.helpers';
import growingConditionsTypes from './growingConditions.types';

export function* fetchGrowingConditions() {
	try {
		const growingConditions = yield handleFetchGrowingConditions();
		yield put(setGrowingConditions(growingConditions));
	} catch (err) {
		// console.log(err);
	}
}

export function* onFetchGrowingConditionsStart() {
	yield takeLatest(
		growingConditionsTypes.FETCH_GROWING_CONDITIONS_START,
		fetchGrowingConditions
	);
}

export default function* growingConditionsSagas() {
	yield all([call(onFetchGrowingConditionsStart)]);
}
