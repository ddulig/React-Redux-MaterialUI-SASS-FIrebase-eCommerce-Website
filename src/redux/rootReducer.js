import { combineReducers } from 'redux';

import productsReducer from './Products/products.reducer';
import productTypesReducer from './ProductTypes/productTypes.reducer';
import containerSizesReducer from './ContainerSizes/containerSizes.reducer';
import growingConditionsReducer from './GrowingConditions/growingConditions.reducer';
import plantSizesReducer from './PlantSizes/plantSizes.reducer';
import usersReducer from './Users/users.reducer';
import messagesReducer from './Messages/messages.reducer';

export default combineReducers({
	productsData: productsReducer,
	productTypesData: productTypesReducer,
	containerSizesData: containerSizesReducer,
	growingConditionsData: growingConditionsReducer,
	plantSizesData: plantSizesReducer,
	user: usersReducer,
	messagesData: messagesReducer
});
