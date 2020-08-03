import productsTypes from './products.types';

const INITIAL_STATE = {
	products: [],
	product: null,
	productError: null
};

const productsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case productsTypes.SET_PRODUCTS:
			return {
				...state,
				products: action.payload
			};
		case productsTypes.SET_PRODUCT:
			return {
				...state,
				product: action.payload
			};
		case productsTypes.RESET_PRODUCT:
			return {
				...state,
				product: null
			};
		case productsTypes.PRODUCT_ERROR:
			return {
				...state,
				productError: action.payload
			};
		case productsTypes.RESET_PRODUCT_ERROR:
			return {
				...state,
				productError: null
			};
		default:
			return state;
	}
};

export default productsReducer;
