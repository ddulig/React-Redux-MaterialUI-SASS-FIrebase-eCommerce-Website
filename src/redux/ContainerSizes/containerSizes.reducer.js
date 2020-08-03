import containerSizesTypes from './containerSizes.types';

const INITIAL_STATE = {
	containerSizes: []
};

const containerSizesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case containerSizesTypes.SET_CONTAINER_SIZES:
			return {
				...state,
				containerSizes: action.payload
			};
		default:
			return state;
	}
};

export default containerSizesReducer;
