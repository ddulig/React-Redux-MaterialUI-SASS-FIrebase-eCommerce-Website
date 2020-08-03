import plantSizesTypes from './plantSizes.types';

export const fetchPlantSizesStart = () => ({
	type: plantSizesTypes.FETCH_PLANT_SIZES_START
});

export const setPlantSizes = plantSizes => ({
	type: plantSizesTypes.SET_PLANT_SIZES,
	payload: plantSizes
});
