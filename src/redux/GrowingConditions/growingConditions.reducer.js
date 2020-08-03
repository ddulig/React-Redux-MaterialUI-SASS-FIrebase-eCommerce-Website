import growingConditionsTypes from './growingConditions.types';

const INITIAL_STATE = {
	growingConditions: []
};

const growingConditionsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case growingConditionsTypes.SET_GROWING_CONDITIONS:
			return {
				...state,
				growingConditions: action.payload
			};
		default:
			return state;
	}
};

export default growingConditionsReducer;
