import productTypesTypes from './productTypes.types';

const INITIAL_STATE = {
	productTypes: []
};

const productTypesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case productTypesTypes.SET_PRODUCT_TYPES:
			return {
				...state,
				productTypes: action.payload
			};
		default:
			return state;
	}
};

export default productTypesReducer;
