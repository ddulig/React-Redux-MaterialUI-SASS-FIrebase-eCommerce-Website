import productTypesTypes from './productTypes.types';

export const fetchProductTypesStart = () => ({
	type: productTypesTypes.FETCH_PRODUCT_TYPES_START
});

export const setProductTypes = productTypes => ({
	type: productTypesTypes.SET_PRODUCT_TYPES,
	payload: productTypes
});
