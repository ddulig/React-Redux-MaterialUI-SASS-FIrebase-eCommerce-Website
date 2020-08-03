import containerSizesTypes from './containerSizes.types';

export const fetchContainerSizesStart = () => ({
	type: containerSizesTypes.FETCH_CONTAINER_SIZES_START
});

export const setContainerSizes = containerSizes => ({
	type: containerSizesTypes.SET_CONTAINER_SIZES,
	payload: containerSizes
});
