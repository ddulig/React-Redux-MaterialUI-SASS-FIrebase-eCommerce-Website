import productsTypes from './products.types';

export const fetchProductsStart = () => ({
	type: productsTypes.FETCH_PRODUCTS_START
});

export const setProducts = products => ({
	type: productsTypes.SET_PRODUCTS,
	payload: products
});

export const fetchProductStart = documentID => ({
	type: productsTypes.FETCH_PRODUCT_START,
	payload: documentID
});

export const setProduct = products => ({
	type: productsTypes.SET_PRODUCT,
	payload: products
});

export const resetProduct = () => ({
	type: productsTypes.RESET_PRODUCT
});

export const addProductStart = product => ({
	type: productsTypes.ADD_NEW_PRODUCT_START,
	payload: product
});

export const deleteProductStart = (product, page) => ({
	type: productsTypes.DELETE_PRODUCT_START,
	payload: product,
	page: page
});

export const editProductStart = (product, page) => ({
	type: productsTypes.EDIT_PRODUCT_START,
	payload: product,
	page: page
});

export const setProductError = error => ({
	type: productsTypes.PRODUCT_ERROR,
	payload: error
});

export const resetProductError = () => ({
	type: productsTypes.RESET_PRODUCT_ERROR
});
