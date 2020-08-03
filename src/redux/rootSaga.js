import { all, call } from 'redux-saga/effects';

import productsSagas from './Products/products.sagas';
import productTypesSagas from './ProductTypes/productTypes.sagas';
import containerSizesSagas from './ContainerSizes/containerSizes.sagas';
import growingConditionsSagas from './GrowingConditions/growingConditions.sagas';
import plantSizesSagas from './PlantSizes/plantSizes.sagas';
import usersSagas from './Users/users.sagas';

export default function* rootSaga() {
	yield all([
		call(productsSagas),
		call(productTypesSagas),
		call(containerSizesSagas),
		call(growingConditionsSagas),
		call(plantSizesSagas),
		call(usersSagas)
	]);
}
