import growingConditionsTypes from './growingConditions.types';

export const fetchGrowingConditionsStart = () => ({
	type: growingConditionsTypes.FETCH_GROWING_CONDITIONS_START
});

export const setGrowingConditions = growingConditions => ({
	type: growingConditionsTypes.SET_GROWING_CONDITIONS,
	payload: growingConditions
});
