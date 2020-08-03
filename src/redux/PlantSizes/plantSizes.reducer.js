import plantSizesTypes from './plantSizes.types';

const INITIAL_STATE = {
	plantSizes: []
};

const plantSizesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case plantSizesTypes.SET_PLANT_SIZES:
			return {
				...state,
				plantSizes: action.payload
			};
		default:
			return state;
	}
};

export default plantSizesReducer;
